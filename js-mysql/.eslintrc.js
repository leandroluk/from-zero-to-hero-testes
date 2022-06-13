module.exports = {
  'extends': 'trybe-backend',
  'overrides': [
    {
      'files': [
        './tests/**/*.spec.js',
        './tests/**/*.test.js'
      ],
      'rules': {
        'mocha/no-mocha-arrows': 'off',
        'no-unused-expressions': 'off',
        'sonarjs/no-duplicate-string': 'off'
      }
    }
  ]
}
