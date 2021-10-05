import { Router } from 'express'
import { createOrdersFromWonDeals } from '@src/middlewares/blingRouterHandler'

const router = Router()

router.post('/wonDeals', createOrdersFromWonDeals)

export { router }
