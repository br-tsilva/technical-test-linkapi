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
    const responseMessage = `There are no deals with ${PipedriveDealStatus.WON} status to be created as orders`
    next(httpHelper.response.success(undefined, undefined, responseMessage))
    return
  }

  const newOrders = blingHelper.buildOrdersFromDeals(responseDeals.data)
  const createdBlingOrders = await createOrdersInBlingApi(newOrders, 0, {
    success: [],
    fail: [],
  })

  if (!createdBlingOrders.fail.length) {
    const totalValueByDate = createdBlingOrders.success
      .map((order, _index, vector) => {
        const totalValue = vector.reduce((accumulate, target) => {
          if (target.deal.pedido.data.toLocaleDateString() === order.deal.pedido.data.toLocaleDateString()) {
            return accumulate + order.deal.pedido.itens.item[0].vlr_unit
          }
          return accumulate + 0
        }, 0)

        return {
          date: order.deal.pedido.data.toLocaleDateString(),
          totalValue,
        }
      })
      .filter((target, index, vector) => {
        if (vector.findIndex(({ date }) => date === target.date) < index) {
          return true
        }

        return false
      })

    await (async function recursive(
      arrayValues: Array<{ date: string; totalValue: number }>,
      index: number,
    ): Promise<null> {
      if (index >= arrayValues.length) return null

      const target = arrayValues[index]
      const orderOnThisDate = await mongoManager.findOne(Orders, { where: { date: target.date } })

      if (orderOnThisDate) {
        const totalValue = orderOnThisDate.totalValue + target.totalValue
        await mongoManager.update(Orders, { date: target.date }, { totalValue })
      } else {
        await mongoManager.save(Orders, target)
      }

      return recursive(arrayValues, index + 1)
    })(totalValueByDate, 0)
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
