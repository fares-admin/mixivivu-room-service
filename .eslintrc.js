module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'next/core-web-vitals',
    'airbnb',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.eslint.json',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'import/extensions': [
      'off',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/no-extraneous-dependencies': ['off', { devDependencies: true }],
    '@typescript-eslint/return-await': ['off'],
    'class-methods-use-this': ['off'],
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': ['off'],
    // gives warning if spread props getting passed to component ex. (...props)
    'react/jsx-props-no-spreading': ['off'],
    // suppress errors for Function component is not a function declaration turning off allows us to use arrow functions
    'react/function-component-definition': ['off'],
    'jsx-a11y/no-noninteractive-element-interactions': ['off'],
    'jsx-a11y/anchor-is-valid': [
      'off',
      {
        components: ['Link'],
        specialLink: ['to'],
      },
    ],
    'import/order': 'off',
    'react/require-default-props': 'off',
    'prettier/prettier': ['error', { singleQuote: true, semi: false }],
    'import/prefer-default-export': 'off',
    'import/export': 0,
    'no-console': 'error',
    'no-param-reassign': 0,
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/label-has-for': 'off',
    'no-underscore-dangle': 'off',
    'react/no-array-index-key': ['off'],
    'jsx-a11y/click-events-have-key-events': ['off'],
    'jsx-a11y/no-static-element-interactions': ['off'],
    'no-extra-boolean-cast': 'off',
    'react/jsx-no-useless-fragment': [2, { allowExpressions: true }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'import/no-cycle': 'off',
  },
}
