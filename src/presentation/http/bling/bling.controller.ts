import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@src/infra/services/pipedrive.service'
import { blingRest } from '@src/infra/services/bling.service'
import { PipedriveDealStatus, IBlingOrder, IBlingResponseOrder, IBlingResponseError } from '@src/infra/interfaces'
import { blingHelper } from '@src/infra/helpers'
import { httpHelper } from '@src/presentation/helpers'
import { getMongoManager } from 'typeorm'
import { Orders } from '@src/infra/repositories'

interface ICreateOrdersInBlingApiStatuses {
  success: Array<IBlingResponseOrder>
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

      statuses.success.push(blingResponse.retorno.pedidos[0])
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
    const serializedOrdersToInsertOnDatabase = responseDeals.data.map((deal) =>
      mongoManager.create(Orders, {
        dealId: String(deal.id),
        dealName: deal.title,
        contactPerson: deal.person_name,
        currency: deal.currency,
        value: Number(deal.value),
      }),
    )

    await mongoManager.save(Orders, serializedOrdersToInsertOnDatabase)
  }

  const buildedResponse = httpHelper.response.success(createdBlingOrders)
  next(buildedResponse)
}

export default { createOrdersFromWonDeals }
