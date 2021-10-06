import { Router } from 'express'
import blingController from '@presentation/http/bling/bling.controller'

const router = Router()

router.get('/orders', blingController.getOrders)
router.post('/wonDeals', blingController.createOrdersFromWonDeals)

export { router }
