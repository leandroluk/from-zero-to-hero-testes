module.exports = {
  extends: 'trybe-backend-typescript',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'comma-dangle': 'off',
  },
  overrides: [
    {
      files: ['./tests/**/*.ts'],
      rules: {
        'no-unused-expressions': 'off',
        'newline-per-chained-call': 'off',
        'mocha/no-mocha-arrows': 'off',
        'mocha/no-setup-in-describe': 'off',
        'sonarjs/no-duplicate-string': 'off',
        'sonarjs/prefer-object-literal': 'off',
        'max-lines-per-function': 'off',
        'max-lines': 'off',
      },
    },
  ],
};
