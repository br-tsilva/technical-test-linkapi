/* eslint-disable no-console */
import express, { Express } from 'express'
import cors from 'cors'
import database from '@src/database'
import { router } from '@src/routes'
import { responseHandler } from '@src/middlewares/response.middleware'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(responseHandler)

export default {
  start: (): Promise<Express> =>
    Promise.all([database()]).then(async () => {
      console.log('Connected with database')

      return app
    }),
}
