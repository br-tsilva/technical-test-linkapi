import { Router } from 'express'
import dealsController from '@presentation/http/deals/deals.controller'

const router = Router()

router.get('/:status', dealsController.getDealsByStatus)

export { router }
