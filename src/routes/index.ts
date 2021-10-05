import { Router } from 'express'
import { router as routerDeals } from './deals'
import { router as routerBling } from './bling'

const router = Router()

router.get('/', (_request, response) => {
  response.sendStatus(200)
})
router.use('/deals', routerDeals)
router.use('/bling', routerBling)

export { router }
