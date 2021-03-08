const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

// quick hack: replace the first character of the paths "." with jest's "<rootDir>"
const moduleNameMapBase = pathsToModuleNameMapper(compilerOptions.paths);
const moduleNameMapRootDir = {};
for (const [key, value] of Object.entries(moduleNameMapBase)) {
  moduleNameMapRootDir[key] = `<rootDir>${value.substring(1)}`;
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      diagnostics: true,
    },
  },
  moduleNameMapper: moduleNameMapRootDir,
};
