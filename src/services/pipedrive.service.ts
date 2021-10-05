import axios, { AxiosResponse } from 'axios'
import { pipedriveHelper } from '@src/helpers'
import {
  IPipedriveGetDealsRequest,
  IPipedriveGetDealsResponse,
} from '@src/adapters'

const pipedriveRest = {
  getAllDeals: (
    rawParameters?: IPipedriveGetDealsRequest,
  ): Promise<AxiosResponse<IPipedriveGetDealsResponse>> => {
    const parameters = rawParameters ?? {}
    const encodedParameters = new URLSearchParams()

    if (parameters.status) encodedParameters.append('status', parameters.status)

    const endpoint = pipedriveHelper.buildEndpoint(
      '/v1/deals',
      encodedParameters,
    )
    const request = axios.get(endpoint)

    return request
  },
}

export { pipedriveRest }
