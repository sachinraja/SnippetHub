const jestConfig = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleDirectories: ['node_modules', '<rootDir>'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@hooks(.*)$': '<rootDir>/src/hooks$1',
    '^@layouts(.*)$': '<rootDir>/src/layouts$1',
    '^@lib(.*)$': '<rootDir>/src/lib$1',
    '^@graphql(.*)$': '<rootDir>/src/graphql$1',
  },
}

export default jestConfig
