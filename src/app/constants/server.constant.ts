const { SERVER_PORT } = process.env

export const server = {
  serverPort: String(SERVER_PORT || 3000),
}
