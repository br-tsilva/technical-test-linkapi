const { PIPEDRIVE_COMPANY_NAME, PIPEDRIVE_API_TOKEN } = process.env

export const pipedrive = {
  companyName: String(PIPEDRIVE_COMPANY_NAME),
  apiToken: String(PIPEDRIVE_API_TOKEN),
}
