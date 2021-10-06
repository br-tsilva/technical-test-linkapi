/* eslint-disable no-console */
import 'reflect-metadata'
import express, { Express } from 'express'
import cors from 'cors'
import database from '@infra/services/database.service'
import { router } from '@presentation/http/routes'
import { responseHandler } from '@presentation/http/response/response.middleware'

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
