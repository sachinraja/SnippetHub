module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
  ],
  ignorePatterns: [
    'node_modules',
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
    '@typescript-eslint',
    'react',
    'sort-imports-es6-autofix',
  ],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',

    // does not matter as prettier already checks for semis
    // interferes with prettier's rule to place semi before lists
    '@typescript-eslint/no-extra-semi': 'off',

    '@typescript-eslint/no-unsafe-assignment': 'off',

    '@typescript-eslint/no-unsafe-member-access': 'off',

    '@typescript-eslint/no-use-before-define': 'error',

    // incompatible with the simple-icon imports
    '@typescript-eslint/no-var-requires': 'off',

    camelcase: 'off',
    // doesn't work with typescript enum
    'no-shadow': 'off',
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

    // This rule is not compatible with Next.js's <Link /> components
    'jsx-a11y/anchor-is-valid': 'off',

    // does not always work correctly, only enable the ts version
    'no-use-before-define': 'off',

    'prettier/prettier': [
      'error',
      { semi: false, singleQuote: true, trailingComma: 'all' },
    ],

    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],

    // suppress errors for missing 'import React' in files - Next.js automatically imports it
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
      typescript: {},
    },
  },
}
