module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack.config.js'
      }
    }
  },
  rules: {
    'arrow-parens': [
      'error',
      'as-needed'
    ],
    'no-unused-vars': [
      'error', { 'ignoreRestSiblings': true }
    ],
    'indent': [
      'error',
      2,
      { 'ignoredNodes': ['ConditionalExpression'] }
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-mixed-spaces-and-tabs': [
      'error',
      'smart-tabs'
    ],
    'comma-style': ['error', 'last'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'space-before-blocks': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'spaced-comment': ['error', 'always'],
    'valid-jsdoc': 'error',
    'curly': 'error',
    'dot-notation': 'error',
    'eqeqeq': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'jsx-quotes': ['error', 'prefer-single'],
    'key-spacing': 'off',
    'keyword-spacing': ['error', { 'before': true }],
    'line-comment-position': ['error', { 'position': 'above' }],
    'lines-between-class-members': ['error', 'always'],
    'no-var': 'error',
    'max-len': ['error', { 'code': 150 }],
    'arrow-spacing': 'error',
    'no-console': 'warn',
    'no-param-reassign': ['error', { 'props': false }],
    'no-multi-spaces': [
      'error',
      {
        'exceptions': {
          'Property': true,
          'ImportDeclaration': true,
          'VariableDeclarator': true
        }
      }
    ],
    'object-curly-spacing': [
      'error',
      'always',
      {
        'arraysInObjects': true,
        'objectsInObjects': true
      }
    ],
    'object-shorthand': [
      'error', 'consistent'
    ],
    'block-spacing': 'off',
    'jsx-a11y/anchor-is-valid': ['error', {
      'components': ['Link'],
      'specialLink': ['to']
    }],
    'import/prefer-default-export': 'warn',
    'import/no-extraneous-dependencies': [
      'error',
      {
        'devDependencies': [
          '**/rollup.config.js',
          './eslint/tests/*'
        ]
      }
    ],
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { 'extensions': ['.jsx'] }],
    'react/no-direct-mutation-state': 'error',
    'react/no-unused-prop-types': 'off',
    'react/no-unused-state': 'off',
    'react/sort-prop-types': ['error', { 'ignoreCase': true }],
    'react/no-unescaped-entities': 'error',
    'react/jsx-curly-spacing': ['error', 'never'],
    'react/jsx-equals-spacing': ['error', 'never'],
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-max-props-per-line': ['warn', { 'maximum': 1, 'when': 'multiline' }],
    'react/jsx-one-expression-per-line': 'error',
    'react/jsx-curly-brace-presence': ['error', { 'props': 'never', 'children': 'ignore' }],
    'react/jsx-sort-props': [
      'error',
      {
        'callbacksLast': false,
        'shorthandFirst': true,
        'shorthandLast': false,
        'ignoreCase': true,
        'noSortAlphabetically': false,
        'reservedFirst': false
      }
    ],
    'react/jsx-handler-names': [
      'error',
      {
        'eventHandlerPrefix': 'handle',
        'eventHandlerPropPrefix': 'on'
      }
    ],
    'react/require-default-props': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
}
