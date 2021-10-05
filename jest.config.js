const path = require('path')
const rootDir = path.resolve(__dirname)

module.exports = {
  clearMocks: true,
  displayName: 'root-test',
  rootDir,
  testEnvironment: 'node',
  preset: 'ts-jest',
  coverageProvider: 'v8',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
  moduleNameMapper: {
    '@src/(.*)': '<rootDir>/src/$1',
    '@test/(.*)': '<rootDir>/__test__/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/src/__test__/jest-setup.ts'],
}
