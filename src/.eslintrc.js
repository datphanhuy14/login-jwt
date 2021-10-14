module.exports = {

  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true,
    'node': true,
  },
  'extends': ['eslint:recommended', 'google'],
  'parserOptions': {
    'ecmaVersion': 12,
  },
  'rules': {
    'require-jsdoc': 0,
    'new-cap': 0,
  },
};
