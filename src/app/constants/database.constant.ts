const { MONGO_HOST, MONGO_PORT, MONGO_NAME, MONGO_USERNAME, MONGO_PASSWORD } = process.env

export const database = {
  mongoHost: String(MONGO_HOST),
  mongoPort: String(MONGO_PORT),
  mongoName: String(MONGO_NAME),
  mongoUser: String(MONGO_USERNAME),
  mongoPassword: String(MONGO_PASSWORD),
}
