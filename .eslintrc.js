module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['immutable'],
  rules: {
    'immutable/no-mutation': 'warn',
  },
  globals: {
    axios: readonly
  }
};
