module.exports = {
  extends: [
    'plugin:@typescript-eslint/recommended',
    'react-app',
    'airbnb',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  plugins: ['@typescript-eslint', 'react-hooks', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    'react/jsx-filename-extension': false,
    'import/no-unresolved': false,
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': 'error',
    '@typescript-eslint/camelcase': ['error', { properties: 'never' }]
  }
};
