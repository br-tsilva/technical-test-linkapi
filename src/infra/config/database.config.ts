import { IDatabaseOptions } from '@src/infra/interfaces'
import { constants } from '@src/app/constants'

const {
  database: { mongoHost, mongoName, mongoPassword, mongoPort, mongoUser },
} = constants

export default <IDatabaseOptions>{
  mongodb: {
    type: 'mongodb',
    url: `mongodb+srv://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoName}`,
    host: mongoHost,
    port: Number(mongoPort),
    database: mongoName,
    username: mongoUser,
    password: mongoPassword,
    useUnifiedTopology: true,
    writeConcern: {
      w: 'majority',
      j: true,
    },
  },
}
