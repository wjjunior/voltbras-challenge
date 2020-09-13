
const path = require('path')

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: path.join(__dirname, './prisma/prisma-test-environment.js'),
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
