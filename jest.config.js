/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const JSON5 = require('json5')
const fs = require('fs')

module.exports = {
  globals: {
    'ts-jest': {
      diagnostics: true,
      tsconfig: 'tsconfig.json',
    },
  },
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  moduleNameMapper: pathsToModuleNameMapper(
    // must parse with JSON5 for trailing commas and comments
    JSON5.parse(fs.readFileSync('tsconfig.json')).compilerOptions.paths,
    {
      prefix: '<rootDir>',
    },
  ),
  preset: 'ts-jest',
  testEnvironment: 'node',
}
