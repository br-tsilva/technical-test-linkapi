import database from '@src/infra/services/database.service'

describe('Unit: Database', () => {
  it('Connect with database', async () => {
    expect(database()).toBeTruthy()
  })
})
