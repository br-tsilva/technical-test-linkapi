import { Router } from 'express'
import dealsMiddleware from '@src/middlewares/deals.middleware'

const router = Router()

router.get('/:status', dealsMiddleware.getDealsByStatus)

export { router }
