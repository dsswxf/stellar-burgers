/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@utils-types$': '<rootDir>/src/utils/types.ts',
    '^@api$': '<rootDir>/src/utils/burger-api.ts'
  },
  testMatch: ['<rootDir>/src/**/?(*.)+(spec|test).[tj]s?(x)']
};
