module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
    GIT_COMMIT_ID: true,
  },
  rules: {
    'arrow-body-style': 0,
    'react/no-array-index-key': 0,
    '@typescript-eslint/camelcase': 0,
    'import/order': 0,
  },
};
