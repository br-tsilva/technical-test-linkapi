import { Request, Response, NextFunction } from 'express'
import { pipedriveRest } from '@src/services/pipedrive.service'
import { httpHelper } from '@src/helpers'
import { PipedriveDealStatus } from '@src/adapters'

const getDealsByStatus = async (
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
    next(httpHelper.response.error('The status entered is invalid', 400))
    return
  }

  const allowedStatus = allowedStatuses[allowedStatusIndexFound]
  const responseDeals = await pipedriveRest.getAllDeals({
    status: allowedStatus,
  })

  if (!responseDeals.success) {
    next(httpHelper.response.error(responseDeals.error))
    return
  }

  const buildedResponse = httpHelper.response.success(responseDeals.data)
  next(buildedResponse)
}

export default { getDealsByStatus }
