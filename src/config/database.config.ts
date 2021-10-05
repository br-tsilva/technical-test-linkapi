import { IDatabaseOptions } from '@src/adapters'

const { MONGODB_NAME, MONGODB_PORT, MONGODB_USERNAME, MONGODB_PASSWORD } =
  process.env

export default <IDatabaseOptions>{
  mongodb: {
    type: 'mongodb',
    database: MONGODB_NAME,
    port: Number(MONGODB_PORT),
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
  },
}
