import { Router } from 'express'
import { getDeals } from '@src/middlewares/dealsRouterHandler'

const router = Router()

router.get('/:status', getDeals)

export { router }
