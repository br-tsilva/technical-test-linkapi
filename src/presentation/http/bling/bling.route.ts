import { Router } from 'express'
import blingController from '@src/presentation/http/bling/bling.controller'

const router = Router()

router.get('/aggregateOrders', blingController.aggregateOrders)
router.post('/wonDeals', blingController.createOrdersFromWonDeals)

export { router }
