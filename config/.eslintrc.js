module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'react', 'react-native', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    'react-native/react-native': true
  },
  rules: {
    'no-console': ['warn'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    curly: ['error'],
    'func-style': ['error', 'expression'],
    eqeqeq: ['error', 'always'],
    yoda: ['error'],
    'no-await-in-loop': ['error'],
    'no-template-curly-in-string': ['error'],
    'array-callback-return': ['error'],
    'block-scoped-var': ['error'],
    'no-alert': ['error'],
    'no-caller': ['error'],
    'no-else-return': ['error'],
    'no-empty-function': ['error'],
    'no-extra-bind': ['error'],
    'no-floating-decimal': ['error'],
    'no-lone-blocks': ['error'],
    'no-loop-func': ['error'],
    'no-return-assign': ['error'],
    'no-return-await': ['error'],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-throw-literal': ['error'],
    'no-useless-concat': ['error'],
    'no-useless-return': ['error'],
    'no-void': ['error'],
    'prefer-regex-literals': ['error'],
    radix: ['error'],
    'require-await': ['error'],
    'no-shadow': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-constructor': ['error'],
    'no-var': ['error'],
    'prefer-arrow-callback': ['error'],
    'prefer-rest-params': ['error'],
    'prefer-spread': ['error'],
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true
      }
    ],
    '@typescript-eslint/unbound-method': ['off'],
    '@typescript-eslint/no-misused-promises': ['off'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-native/no-inline-styles': 'warn'
  }
};
