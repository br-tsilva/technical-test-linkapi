import { constants } from '@app/constants'

const {
  pipedrive: { companyName, apiToken },
} = constants

const pipedriveHelper = {
  buildEndpoint: (endpoint: string, parameters: URLSearchParams): string => {
    const newEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

    parameters.append('api_token', apiToken)

    return `https://${companyName}.pipedrive.com/api${newEndpoint}?${parameters}`
  },
}

export { pipedriveHelper }
