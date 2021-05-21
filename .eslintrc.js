module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  ignorePatterns: [
    '.next',
    '__generated__',
    '**/*.graphql.d.ts',
    '__codegen_cache__',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: [
    'prettier',
    'react',
    'sort-imports-es6-autofix',
    '@typescript-eslint',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // interferes with prettier's rule to place semi before lists
    '@typescript-eslint/no-extra-semi': 'off',

    // incompatible with the simple-icon imports
    '@typescript-eslint/no-var-requires': 'off',

    camelcase: [
      'error',
      {
        allow: ['Prisma__UserClient', 'Prisma__PackClient', 'name_authorId'],
      },
    ],
    // doesn't work with ts - use @typescript-eslint version
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-shadow': 'off',
    'no-use-before-define': 'off',

    // override airbnb
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],

    'no-param-reassign': [
      'error',
      { ignorePropertyModificationsFor: ['accu'] },
    ],

    // does not work with sort imports
    'import/order': 'off',

    'import/prefer-default-export': 'off',

    // not compatible with Next.js <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',

    'prettier/prettier': [
      'error',
      { semi: false, singleQuote: true, trailingComma: 'all' },
    ],

    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],

    // using jsx transform
    'react/react-in-jsx-scope': 'off',

    'react/jsx-props-no-spreading': 'off',

    'sort-imports-es6-autofix/sort-imports-es6': [
      'error',
      {
        ignoreCase: false,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json',
      },
    },
  },
}
