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

const productionOnly = process.env.STRICT_LINT === 'true' ? 'error' : 'off';
const warnInDev = process.env.STRICT_LINT === 'true' ? 'error' : 'warn';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    // "plugin:vue/vue3-essential",
    // "@vue/typescript/recommended",
    // "@vue/prettier",
    // "@vue/prettier/@typescript-eslint",
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
  ignorePatterns: [
    'packages/tokenizer-sdk/src/generated',
    'lunatrace/bsl/frontend/src/api/generated.ts'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    tsconfigRootDir: __dirname,
    ecmaVersion: 12,
    sourceType: 'module',
    project: [
      'js/sdks/packages/vue-sdk/tsconfig.json',
      'js/sdks/tsconfig.json',
      'js/demo-apps/packages/demo-back-end/tsconfig.json',
      'js/demo-apps/packages/react-front-end/tsconfig.json',
      'js/internal-infrastructure/metrics-server-backend/tsconfig.json',
      'js/internal-infrastructure/s3-redirect-generator/tsconfig.json',
      'lunatrace/bsl/frontend/tsconfig.json',
      'lunatrace/bsl/backend-cdk/tsconfig.json',
      'lunatrace/bsl/backend/tsconfig.json'
    ]
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest'
  ],
  rules: {
    "@typescript-eslint/no-unsafe-argument": 1, // TODO: Re-enable this rule and fix all errors
    'no-console': productionOnly, // These never error, currently
    'no-debugger': productionOnly,
    eqeqeq: 'error',
    quotes: [warnInDev, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'react/jsx-wrap-multilines': [
      productionOnly,
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'parens-new-line',
      }
    ],
    'react/jsx-first-prop-new-line': [
      productionOnly,
      'multiline-multiprop'
    ],
    'react/jsx-max-props-per-line': [
      productionOnly,
      {
        'maximum': 3,
        'when': 'multiline'
      }
    ],
    'react/jsx-indent-props': [
      productionOnly,
      2
    ],
    'react/jsx-closing-bracket-location': [
      productionOnly,
      'tag-aligned',
    ],
    "react-hooks/exhaustive-deps": "off",
    'prettier/prettier': [
      productionOnly,
      {
        singleQuote: true,
        printWidth: 120
      }
      ],
    '@typescript-eslint/explicit-module-boundary-types': 'warn',
    'eslint-comments/disable-enable-pair': [
      'error',
      { 'allowWholeFile': true }
    ],
    'eslint-comments/no-unlimited-disable': 'off',
    'eslint-comments/no-unused-disable': 'error',
    '@typescript-eslint/no-unused-vars':[
      productionOnly,
      { "argsIgnorePattern": "^_" }
    ],
    '@typescript-eslint/no-unsafe-call': 'warn',
    '@typescript-eslint/no-unsafe-member-access': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'warn',
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'import/order': [
      productionOnly,
      { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc' } }
    ],
    'sort-imports': [
      productionOnly,
      { 'ignoreDeclarationSort': true, 'ignoreCase': true }
    ]
  },
  settings: {
    react: {
      version: '16'
    }
  }
}
