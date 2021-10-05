import { IDatabaseOptions } from '@src/adapters'

const {
  MONGO_HOST,
  MONGO_PORT,
  MONGO_NAME,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_NAME,
  MYSQL_USERNAME,
  MYSQL_PASSWORD,
} = process.env

export default <IDatabaseOptions>{
  mongodb: {
    type: 'mongodb',
    url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_NAME}`,
    host: MONGO_HOST,
    port: Number(MONGO_PORT),
    database: MONGO_NAME,
    username: MONGO_USERNAME,
    password: MONGO_PASSWORD,
    useUnifiedTopology: true,
    writeConcern: {
      w: 'majority',
      j: true,
    },
  },
  mysql: {
    type: 'mysql',
    host: MYSQL_HOST,
    port: Number(MYSQL_PORT),
    database: MYSQL_NAME,
    username: MYSQL_USERNAME,
    password: MYSQL_PASSWORD,
  },
}
