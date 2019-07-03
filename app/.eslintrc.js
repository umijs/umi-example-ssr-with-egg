const fabric = require('@umijs/fabric');

module.exports = {
  ...fabric.default,
  rules: {
    ...fabric.default.rules,
    '@typescript-eslint/interface-name-prefix': [0],
    'jsx-a11y/alt-text': [0],
    'arrow-parens': [0],
    'no-underscore-dangle': [0],
    'global-require': [0],
    'lines-between-class-members': [0],
    'no-param-reassign': [0],
    'eslint-comments/no-unlimited-disable': [0],
  },
  globals: {
    SERVER_HOST: true
  }
};
