const path = require('path')
const rootDir = path.resolve(__dirname, '../')
const rootConfig = require(`${rootDir}/jest.config.js`)

module.exports = {
  ...rootConfig,
  displayName: 'E2E-test',
  rootDir,
  testMatch: ['<rootDir>/__test__/**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/__test__/jest-setup.ts'],
}
