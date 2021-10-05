import supertest from 'supertest'
import { app } from '@src/index'

describe('Functional: Bling', () => {
  it('should return status 200 accessing POST /bling/wonDeals', async () => {
    const request = await supertest(app).post(`/bling/wonDeals`)

    expect(request.status).toBe(200)
  })
})
