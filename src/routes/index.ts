import { Router } from 'express'
import { router as dealsRouter } from './deals.route'
import { router as blingRouter } from './bling.route'

const router = Router()

router.get('/', (_request, response) => {
  response.sendStatus(200)
})
router.use('/deals', dealsRouter)
router.use('/bling', blingRouter)

export { router }
