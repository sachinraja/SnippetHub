module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'next',
  ],
  ignorePatterns: ['.next', '.cache', '__generated__', '**/*.graphql.d.ts'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    camelcase: [
      'error',
      {
        allow: ['Prisma__UserClient', 'Prisma__PackClient', 'name_authorId'],
      },
    ],

    // doesn't work with ts - use @typescript-eslint version
    'no-shadow': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-use-before-define': 'error',

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
      // for Array.reduce
      { ignorePropertyModificationsFor: ['accu'] },
    ],

    // completely unnecessary and annoying
    'import/prefer-default-export': 'off',

    // easier to scan
    'import/order': 'error',

    // not compatible with Next.js <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',

    'prettier/prettier': [
      'error',
      { semi: false, singleQuote: true, trailingComma: 'all' },
    ],

    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],

    // using jsx transform
    'react/react-in-jsx-scope': 'off',

    'react/jsx-props-no-spreading': 'off',
  },

  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
}
