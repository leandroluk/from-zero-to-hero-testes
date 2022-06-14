module.exports = {
  'extends': 'trybe-backend',
  'overrides': [
    {
      'files': ['./tests/**/*.js'],
      'rules': {
        'no-unused-expressions': 'off',
        'newline-per-chained-call': 'off',
        'mocha/no-mocha-arrows': 'off',
        'mocha/no-setup-in-describe': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/prefer-object-literal': 'off',
      }
    }
  ]
}
