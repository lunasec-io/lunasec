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
const process = require('process');

const hideErrorsInDev = process.env.HIDE_ERRORS_IN_DEV === 'true';

const productionError = hideErrorsInDev ? 'warn': 'error';
const productionWarn = hideErrorsInDev ? 'off': 'warn';


module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
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
    'lunatrace/bsl/frontend/src/api/generated.ts',
    '@aws-sdk/**',
    'lunatrace/bsl/backend-cdk/cdk.out'
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
      'lunadefend/js/sdks/packages/vue-sdk/tsconfig.json',
      'lunadefend/js/sdks/tsconfig.json',
      'lunadefend/js/demo-apps/packages/demo-back-end/tsconfig.json',
      'lunadefend/js/demo-apps/packages/react-front-end/tsconfig.json',
      'lunadefend/js/internal-infrastructure/metrics-server-backend/tsconfig.json',
      'lunadefend/js/internal-infrastructure/s3-redirect-generator/tsconfig.json',
      'lunatrace/bsl/common/tsconfig.json',
      'lunatrace/bsl/frontend/tsconfig.json',
      'lunatrace/bsl/backend-cdk/tsconfig.json',
      'lunatrace/bsl/backend/tsconfig.json',
      'lunatrace/dev-cli/tsconfig.json',
      'lunatrace/bsl/common/tsconfig.json',
      'lunatrace/bsl/logger/tsconfig.json',
      'lunatrace/bsl/ml/js/tsconfig.json',
      'lunatrace/datadog-metrics-proxy/tsconfig.json',
      'lunatrace/npm-package-cli/tsconfig.json',
      'docs/tsconfig.json'
    ]
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
    'unused-imports'
  ],
  rules: {
    '@typescript-eslint/no-unsafe-argument': productionWarn, // TODO: Re-enable this rule and fix all errors
    '@typescript-eslint/no-misused-promises': productionWarn,
    '@typescript-eslint/no-unsafe-assignment': productionWarn,
    '@typescript-eslint/no-unsafe-call': productionWarn,
    '@typescript-eslint/no-unsafe-return': productionWarn,
    '@typescript-eslint/no-unsafe-member-access': productionWarn,
    'import/namespace': 'off', // productionError,
    'no-console': productionWarn,
    'no-debugger': productionError,
    eqeqeq: 'error',
    quotes: [productionWarn, 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    curly:'warn',
    'react/jsx-wrap-multilines': [
      productionError,
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
      productionError,
      'multiline-multiprop'
    ],
    'react/jsx-max-props-per-line': [
      productionError,
      {
        'maximum': 3,
        'when': 'multiline'
      }
    ],
    'react/jsx-indent-props': [
      productionError,
      2
    ],
    'react/jsx-closing-bracket-location': [
      productionError,
      'tag-aligned',
    ],
    'react-hooks/exhaustive-deps': 'off',
    'prettier/prettier': [
      productionWarn,
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
      productionWarn,
      { 'argsIgnorePattern': '^_' },
    ],
     //'unused-imports/no-unused-imports': 'error', // turn this on if you want to --fix all of these out of the codebase
    '@typescript-eslint/unbound-method': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'import/order': [
      productionError,
      { 'newlines-between': 'always', 'alphabetize': { 'order': 'asc' } }
    ],
    'sort-imports': [
      productionError,
      { 'ignoreDeclarationSort': true, 'ignoreCase': true }
    ]
  },
  settings: {
    react: {
      version: '16'
    }
  }
}
