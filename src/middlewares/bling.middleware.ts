import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@src/services/pipedrive.service'
import { blingRest } from '@src/services/bling.service'
import {
  PipedriveDealStatus,
  IBlingOrder,
  IBlingResponseOrder,
  IBlingResponseError,
} from '@src/adapters'
import { httpHelper, blingHelper } from '@src/helpers'

const createOrdersInBlingApi = async (
  orders: IBlingOrder[],
  index: number,
  statuses: {
    success: Array<IBlingResponseOrder>
    fail: Array<IBlingResponseError>
  },
): Promise<Record<string, unknown>> => {
  if (index >= orders.length) return statuses

  const order = orders[index]

  await blingRest
    .createOrder(order)
    .then((blingResponse) => {
      if (blingResponse.retorno.erros) {
        statuses.fail.push(blingResponse.retorno.erros[0])
        return
      }

      statuses.success.push(blingResponse.retorno.pedidos[0])
    })
    .catch((blingResponse) => {
      statuses.fail.push(blingResponse.retorno.erros[0])
    })

  return createOrdersInBlingApi(orders, index + 1, statuses)
}

const createOrdersFromWonDeals = async (
  _request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const responseDeals = await pipedriveRest.getAllDeals({
    status: PipedriveDealStatus.WON,
  })

  if (!responseDeals.success) {
    next(httpHelper.response.error(responseDeals.error))
    return
  }
  if (!responseDeals.data) {
    next(
      httpHelper.response.error(
        `There are no deals with status ${PipedriveDealStatus.WON} to be created as orders`,
        404,
      ),
    )
    return
  }

  const newOrders = blingHelper.buildOrdersFromDeals(responseDeals.data)
  const ordersSent = await createOrdersInBlingApi(newOrders, 0, {
    success: [],
    fail: [],
  })

  const buildedResponse = httpHelper.response.success(ordersSent)
  next(buildedResponse)
}

export default { createOrdersFromWonDeals }
