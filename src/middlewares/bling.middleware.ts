import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@src/services/pipedrive.service'
import { PipedriveDealStatus } from '@src/adapters'
import { httpHelper } from '@src/helpers'

const createOrdersFromWonDeals = async (
  _request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const responseDeals = await pipedriveRest
    .getAllDeals({
      status: PipedriveDealStatus.WON,
    })
    .then((axiosResponse) => axiosResponse.data)

  const buildedResponse = httpHelper.response.success(responseDeals.data)
  next(buildedResponse)
}

export default { createOrdersFromWonDeals }
