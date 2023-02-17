/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
export const SIDEBAR_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const SIDEBAR_BEHAVIOR = {
  STICKY: 'sticky',
  FIXED: 'fixed',
  COMPACT: 'compact',
};

export const LAYOUT = {
  FLUID: 'fluid',
  BOXED: 'boxed',
};

export const THEME = {
  DEFAULT: 'dark',
  DARK: 'dark',
  LIGHT: 'light',
};

export const THEME_PALETTE_LIGHT = {
  primary: '#3B82EC',
  'primary-dark': '#1659c7',
  'primary-light': '#84aef2',
  secondary: '#495057',
  success: '#4BBF73',
  info: '#1F9BCF',
  warning: '#f0ad4e',
  danger: '#d9534f',
  white: '#fff',
  'gray-100': '#f4f7f9',
  'gray-200': '#e2e8ee',
  'gray-300': '#dee6ed',
  'gray-400': '#ced4da',
  'gray-500': '#adb5bd',
  'gray-600': '#6c757d',
  'gray-700': '#495057',
  'gray-800': '#020202',
  'gray-900': '#212529',
  black: '#000',
};

export const THEME_PALETTE_DARK = {
  ...THEME_PALETTE_LIGHT,
  'primary-dark': '#84aef2',
  'primary-light': '#1659c7',
  white: '#293042',
  'gray-100': '#3e4555',
  'gray-200': '#545968',
  'gray-300': '#696e7b',
  'gray-400': '#7f838e',
  'gray-500': '#9498a1',
  'gray-600': '#a9acb3',
  'gray-700': '#bfc1c6',
  'gray-800': '#d4d6d9',
  'gray-900': '#eaeaec',
  black: '#fff',
};

export const GithubAppUrl: string = process.env.REACT_APP_GITHUB_APP_LINK || 'WARNING GITHUB APP URL UNDEFINED';
