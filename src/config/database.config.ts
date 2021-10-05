import { IDatabaseOptions } from '@src/adapters'

const { MONGODB_HOST, MONGODB_NAME, MONGODB_USERNAME, MONGODB_PASSWORD } =
  process.env

export default <IDatabaseOptions>{
  mongodb: {
    type: 'mongodb',
    url: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}/${MONGODB_NAME}?retryWrites=true&w=majority`,
    host: MONGODB_HOST,
    database: MONGODB_NAME,
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
  },
}
