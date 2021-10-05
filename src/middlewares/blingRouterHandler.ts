import { Request, Response, NextFunction } from 'express'
import { getAllDeals } from '@src/services/pipedriveRest'
import { PipedriveDealStatus } from '@src/adapters'
import { responses } from '@src/helpers'

const createOrdersFromWonDeals = async (
  _request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const responseDeals = await getAllDeals({
    status: PipedriveDealStatus.WON,
  }).then((axiosResponse) => axiosResponse.data)

  const buildedResponse = responses.success(responseDeals.data)
  next(buildedResponse)
}

export { createOrdersFromWonDeals }
