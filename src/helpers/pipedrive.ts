const { PIPEDRIVE_COMPANY_NAME, PIPEDRIVE_API_TOKEN } = process.env

const pipedrive = {
  buildEndpoint: (endpoint: string, parameters: URLSearchParams): string => {
    const newEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`

    return (
      `https://${PIPEDRIVE_COMPANY_NAME}.pipedrive.com` +
      `/api${newEndpoint}` +
      `?api_token=${PIPEDRIVE_API_TOKEN}&${parameters}`
    )
  },
}

export { pipedrive }
