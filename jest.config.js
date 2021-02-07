module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'tsx', 'jsx'],
  globals: {
    "ts-jest": {
      "tsconfig": "tsconfig.json",
      "diagnostics": true
    }
  },
  moduleNameMapper: {
    "@components/(.*)": "<rootDir>/src/components/$1",
    "@constants/(.*)": "<rootDir>/src/constants/$1"
  }
};