import database from '@src/database'

describe('Unit: Database', () => {
  it('Connect with database', async () => {
    expect(database()).toBeTruthy()
  })
})
