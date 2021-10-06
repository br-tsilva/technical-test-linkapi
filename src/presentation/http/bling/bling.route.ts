import { Router } from 'express'
import blingController from '@src/presentation/http/bling/bling.controller'

const router = Router()

router.post('/wonDeals', blingController.createOrdersFromWonDeals)

export { router }
