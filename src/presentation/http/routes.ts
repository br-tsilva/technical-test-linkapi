import { Router } from 'express'
import { router as dealsRouter } from '../presentetion/http/deals/deals.route'
import { router as blingRouter } from '../presentetion/http/bling/bling.route'

const router = Router()

router.get('/', (_request, response) => {
  response.sendStatus(200)
})
router.use('/deals', dealsRouter)
router.use('/bling', blingRouter)

export { router }
