const { BLING_API_HOST, BLING_API_TOKEN } = process.env

export const bling = {
  host: String(BLING_API_HOST),
  apiToken: String(BLING_API_TOKEN),
}
