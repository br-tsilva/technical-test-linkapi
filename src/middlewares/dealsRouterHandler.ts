import { Request, Response, NextFunction } from 'express'
import { getAllDeals } from '@src/services/pipedriveRest'
import { responses } from '@src/helpers'
import { PipedriveDealStatus } from '@src/adapters'

const getDeals = async (
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> => {
  const { status } = request.params
  const allowedStatuses = Object.values(PipedriveDealStatus)
  const allowedStatusIndexFound = allowedStatuses.findIndex(
    (allowedStatus) => allowedStatus === status,
  )

  if (status && allowedStatusIndexFound < 0) {
    next(responses.error('The status entered is invalid', 400))
    return
  }

  const allowedStatus = allowedStatuses[allowedStatusIndexFound]
  const responseDeals = await getAllDeals({ status: allowedStatus }).then(
    (axiosResponse) => axiosResponse.data,
  )

  const buildedResponse = responses.success(responseDeals.data)
  next(buildedResponse)
}

export { getDeals }
