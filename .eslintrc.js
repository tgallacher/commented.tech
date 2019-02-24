module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    es6: true,
  },
  extends: ['prettier'],
  plugins: ['react', 'prettier'],
  globals: {
    graphql: false,
  },
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      ecmaVersion: 2018,
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
