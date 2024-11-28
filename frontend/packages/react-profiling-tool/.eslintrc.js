module.exports = {
  env: {
    browser: true,
    node: true,
  },
    root: true,
    extends: [
      'plugin:@typescript-eslint/recommended',
      'eslint:recommended',
    ],
    parser: '@typescript-eslint/parser', 
    plugins: ['@typescript-eslint'],
    rules: {
      'no-console': 'off',
      'react-hooks/exhaustive-deps': 'off',
      // todo: turn these back on
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/camelcase': 'off',
    },
  };
  