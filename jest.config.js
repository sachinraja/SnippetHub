/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const JSON5 = require('json5')

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(
      JSON5.parse(fs.readFileSync('tsconfig.json')).compilerOptions.paths,
      {
        prefix: '<rootDir>',
      },
    ),
  },
  modulePaths: ['node_modules', '<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
}
