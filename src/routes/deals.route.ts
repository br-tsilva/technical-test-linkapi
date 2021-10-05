import { Router } from 'express'
import dealsMiddleware from '@src/middlewares/dealsRouterHandler'

const router = Router()

router.get('/:status', dealsMiddleware.getDealsByStatus)

export { router }
