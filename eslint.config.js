export default [
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        expect: true,
        body: true,
        chai: true,
        sinon: true,
        riot: true,
        browser: true,
        es6: true,
        mocha: true,
        node: true
      }
    },
    rules: {
      'eqeqeq': ['error', 'smart'],
      'indent': ['error', 2],
      'no-bitwise': ['error', { 'allow': ['|'] }],
      'linebreak-style': ['error', 'unix'],
      'no-cond-assign': 'off',
      'no-console': 'off',
      'no-unexpected-multiline': 'error',
      'quotes': ['error', 'single', 'avoid-escape'],
      'semi': ['error', 'never']
    },
    ignores: [
      'test/vendor/**',
      'test/performance/db-monster/**',
      'test/performance/riot.*.js'
    ]
  }
]