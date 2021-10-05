import express from 'express'
import cors from 'cors'
import { router } from '@src/routes'
import { responseHandler } from '@src/middlewares/response.middleware'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(responseHandler)

export { app }
