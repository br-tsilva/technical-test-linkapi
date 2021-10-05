import { Router } from 'express'
import blingMiddleware from '@src/middlewares/bling.middleware'

const router = Router()

router.post('/wonDeals', blingMiddleware.createOrdersFromWonDeals)

export { router }
