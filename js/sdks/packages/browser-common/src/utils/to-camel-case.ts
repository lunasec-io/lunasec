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
// Fork of: https://github.com/sindresorhus/camelcase/blob/main/index.js

export interface CamelCaseOptions {
  pascalCase: boolean;
  preserveConsecutiveUppercase: boolean;
  locale?: string;
}

export function preserveCamelCase(str: string, locale?: string) {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let i = 0; i < str.length; i++) {
    const character = str[i];

    if (isLastCharLower && /[\p{Lu}]/u.test(character)) {
      str = str.slice(0, i) + '-' + str.slice(i);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      i++;
    } else if (isLastCharUpper && isLastLastCharUpper && /[\p{Ll}]/u.test(character)) {
      str = str.slice(0, i - 1) + '-' + str.slice(i - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower =
        character.toLocaleLowerCase(locale) === character && character.toLocaleUpperCase(locale) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper =
        character.toLocaleUpperCase(locale) === character && character.toLocaleLowerCase(locale) !== character;
    }
  }

  return str;
}

export function preserveConsecutiveUppercase(input: string) {
  return input.replace(/^[\p{Lu}](?![\p{Lu}])/gu, (m1) => m1.toLowerCase());
}

export function postProcess(input: string, options: CamelCaseOptions) {

  return input
    .replace(/[_.\- ]+([\p{Alpha}\p{N}_]|$)/gu, (_, p1) => p1.toLocaleUpperCase(options.locale))
    .replace(/\d+([\p{Alpha}\p{N}_]|$)/gu, (m) => m.toLocaleUpperCase(options.locale));
}

export function toCamelCase(input: string, options?: CamelCaseOptions) {
  if (!options) {
    options = {
      pascalCase: false,
      preserveConsecutiveUppercase: false,
    };
  }

  if (Array.isArray(input)) {
    input = input

      .map((x) => x.trim())
      .filter((x) => x.length)
      .join('-');
  } else {
    input = input.trim();
  }

  if (input.length === 0) {
    return '';
  }

  if (input.length === 1) {
    return options.pascalCase ? input.toLocaleUpperCase(options.locale) : input.toLocaleLowerCase(options.locale);
  }

  const hasUpperCase = input !== input.toLocaleLowerCase(options.locale);

  if (hasUpperCase) {
    input = preserveCamelCase(input, options.locale);
  }

  input = input.replace(/^[_.\- ]+/, '');

  if (options.preserveConsecutiveUppercase) {
    input = preserveConsecutiveUppercase(input);
  } else {
    input = input.toLocaleLowerCase();
  }

  if (options.pascalCase) {
    input = input.charAt(0).toLocaleUpperCase(options.locale) + input.slice(1);
  }

  return postProcess(input, options);
}

export function camelCaseObject<T>(obj: Record<string, T>) {
  return Object.keys(obj).reduce((camelCaseObj, key) => {
    camelCaseObj[toCamelCase(key)] = obj[key];
    return camelCaseObj;
  }, {} as Record<string, T>);
}
