import supertest from 'supertest'
import { app } from '@src/index'

describe('Functional: Pipedrive', () => {
  it('should return status 200 accessing GET /deals/:status', async () => {
    const request = await supertest(app).get(`/deals/won`)

    expect(request.status).toBe(200)
  })

  it('should return status 400 when entering an invalid status accessing GET /deals/:status', async () => {
    const request = await supertest(app).get(`/deals/invalidStatus`)

    expect(request.status).toBe(400)
  })
})
