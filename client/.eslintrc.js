module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": true }]  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
