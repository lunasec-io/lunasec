/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['packages/tokenizer-sdk/src/generated'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: [
      'js/sdks/packages/vue-sdk/tsconfig.json',
      'js/sdks/tsconfig.json',
      'js/demo-apps/packages/demo-back-end/tsconfig.json',
      'js/demo-apps/packages/react-front-end/tsconfig.json',
      'js/internal-infrastructure/metrics-server-backend/tsconfig.json',
    ]
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    eqeqeq: 'error',
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'react/jsx-wrap-multilines': ['error', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line',
    }],
    "react/react-in-jsx-scope": 0,
    "react/display-name":0,
    'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
    'react/jsx-max-props-per-line': ['error', { 'maximum': 3, 'when': 'multiline' }],
    'react/jsx-indent-props': ['error', 2],
    'react/jsx-closing-bracket-location': [
      'error',
      'tag-aligned',
    ],
    "react-hooks/exhaustive-deps": "off",
    'prettier/prettier': ['error', { singleQuote: true, printWidth: 120 }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'eslint-comments/disable-enable-pair': [
      'error',
      { 'allowWholeFile': true }
    ],
    'eslint-comments/no-unlimited-disable':'off',
    'eslint-comments/no-unused-disable': 'error',
    '@typescript-eslint/no-unused-vars':['warn',{ "argsIgnorePattern": "^_" }],
    '@typescript-eslint/no-unsafe-call':'off', // Did this because of a bug with intellij (forrest)
    '@typescript-eslint/no-unsafe-member-access':'off',
    '@typescript-eslint/no-unsafe-assignment':'off',
    'import/order': [
      'error',
      { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc' } }
    ],
    'sort-imports': [
      'error',
      { 'ignoreDeclarationSort': true, 'ignoreCase': true }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
