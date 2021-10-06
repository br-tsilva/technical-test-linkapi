import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@infra/services/pipedrive.service'
import { blingRest } from '@infra/services/bling.service'
import { PipedriveDealStatus, IBlingOrder, IBlingResponseOrder, IBlingResponseError } from '@infra/interfaces'
import { blingHelper } from '@infra/helpers'
import { httpHelper } from '@presentation/helpers'
import { getMongoManager } from 'typeorm'
import { Orders } from '@infra/repositories'

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
    const valuesByDate = createdBlingOrders.success.map((order) => ({
      date: order.deal.pedido.data.toLocaleDateString(),
      value: order.deal.pedido.itens.item[0].vlr_unit,
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

    await mongoManager.save(Orders, reducedValuesByDate)
  }

  const buildedResponse = httpHelper.response.success(createdBlingOrders)
  next(buildedResponse)
}

const getOrders = async (_request: Request, _response: Response, next: NextFunction): Promise<void> => {
  const mongoManager = getMongoManager()
  const orders = await mongoManager.find(Orders)

  const buildedResponse = httpHelper.response.success({ orders })
  next(buildedResponse)
}

export default { getOrders, createOrdersFromWonDeals }
