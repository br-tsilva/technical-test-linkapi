import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@src/infra/services/pipedrive.service'
import { blingRest } from '@src/infra/services/bling.service'
import { PipedriveDealStatus, IBlingOrder, IBlingResponseOrder, IBlingResponseError } from '@src/infra/interfaces'
import { blingHelper } from '@src/infra/helpers'
import { httpHelper } from '@src/presentation/helpers'
import { getMongoManager } from 'typeorm'
import { Orders } from '@src/infra/repositories'

interface ICreateOrdersInBlingApiStatuses {
  success: Array<{ deal: IBlingOrder; response: IBlingResponseOrder }>
  fail: Array<IBlingResponseError>
}

const createOrdersInBlingApi = async (
  orders: IBlingOrder[],
  index: number,
  statuses: ICreateOrdersInBlingApiStatuses,
): Promise<ICreateOrdersInBlingApiStatuses> => {
  if (index >= orders.length) return statuses

  const order = orders[index]

  await blingRest
    .createOrder(order)
    .then((blingResponse) => {
      if (blingResponse.retorno.erros) {
        statuses.fail.push(blingResponse.retorno.erros[0])
        return
      }

      statuses.success.push({ deal: order, response: blingResponse.retorno.pedidos[0] })
    })
    .catch((blingResponse) => {
      statuses.fail.push(blingResponse.retorno.erros[0])
    })

  return createOrdersInBlingApi(orders, index + 1, statuses)
}

const createOrdersFromWonDeals = async (_request: Request, _response: Response, next: NextFunction): Promise<void> => {
  const mongoManager = getMongoManager()
  const responseDeals = await pipedriveRest.getAllDeals({
    status: PipedriveDealStatus.WON,
  })

  if (!responseDeals.success) {
    next(httpHelper.response.error(responseDeals.error))
    return
  }
  if (!responseDeals.data) {
    next(
      httpHelper.response.success(
        undefined,
        undefined,
        `There are no deals with ${PipedriveDealStatus.WON} status to be created as orders`,
      ),
    )
    return
  }

  const newOrders = blingHelper.buildOrdersFromDeals(responseDeals.data)
  const createdBlingOrders = await createOrdersInBlingApi(newOrders, 0, {
    success: [],
    fail: [],
  })

  if (!createdBlingOrders.fail.length) {
    const serializedOrdersToInsertOnDatabase = createdBlingOrders.success.map((order) =>
      mongoManager.create(Orders, {
        orderId: order.response.pedido.idPedido,
        dealId: String(order.deal.pedido.itens.item[0].codigo),
        dealName: order.deal.pedido.itens.item[0].descricao,
        contactPerson: order.deal.pedido.cliente.nome,
        value: order.deal.pedido.itens.item[0].vlr_unit,
      }),
    )
    await mongoManager.save(Orders, serializedOrdersToInsertOnDatabase)
  }

  const buildedResponse = httpHelper.response.success(createdBlingOrders)
  next(buildedResponse)
}

const aggregateOrders = async (_request: Request, _response: Response, next: NextFunction): Promise<void> => {
  const mongoManager = getMongoManager()
  const orders = await mongoManager.find(Orders)
  const valuesByDate = orders.map((order) => ({
    date: order.createdAt.toLocaleDateString(),
    value: order.value,
  }))
  const reducedValuesByDate = (function recursive(
    arrayValues: Array<{ date: string; value: number }>,
    index: number,
    aggregate: Array<{ date: string; totalValue: number }>,
  ): Array<{ date: string; totalValue: number }> {
    if (index >= arrayValues.length) return aggregate

    const current = arrayValues[index]
    const dateIsAlreadyInserted = aggregate.find(({ date }) => date === current.date)

    if (!dateIsAlreadyInserted) {
      const totalValue = arrayValues
        .filter((currentValue) => currentValue.date === current.date)
        .reduce((accumulate, currentValue) => accumulate + currentValue.value, 0)

      aggregate.push({ date: current.date, totalValue })
    }

    return recursive(arrayValues, index + 1, aggregate)
  })(valuesByDate, 0, [])

  const buildedResponse = httpHelper.response.success({ sumValuesByDate: reducedValuesByDate, orders })
  next(buildedResponse)
}

export default { aggregateOrders, createOrdersFromWonDeals }
