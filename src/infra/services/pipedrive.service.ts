import axios from 'axios'
import { pipedriveHelper } from '@src/infra/helpers'
import { IPipedriveGetDealsRequest, IPipedriveGetDealsResponse } from '@src/infra/interfaces'

const pipedriveRest = {
  getAllDeals: (rawParameters?: IPipedriveGetDealsRequest): Promise<IPipedriveGetDealsResponse> => {
    const parameters = rawParameters ?? {}
    const encodedParameters = new URLSearchParams()

    if (parameters.status) encodedParameters.append('status', parameters.status)

    const endpoint = pipedriveHelper.buildEndpoint('/v1/deals', encodedParameters)

    return axios
      .get(endpoint)
      .then(({ data }) => data)
      .catch(({ response }) => response.data)
  },
}

export { pipedriveRest }
