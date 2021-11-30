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
import { constants } from 'fs';
import { access } from 'fs/promises';
import { resolve } from 'path';
import * as process from 'process';

import { splitEvery } from 'ramda';

// eslint-disable-next-line import/no-unresolved
import { putS3ObjectWithRedirect } from './put-s3-object.js';
// eslint-disable-next-line import/no-unresolved
import { LinkRedirect, S3RedirectConfig } from './types.js';

interface ArgumentConfig {
  inputConfig: string;
  bucket: string;
}

export function printHelp() {
  console.error(`Must provide the following arguments:
  --inputConfig: Path to the file to read config from.
  --bucket: The S3 bucket to send requests to for redirects.

Example Usage:
  s3-redirect-generator --inputConfig ./foo.js --bucket some-s3-bucket
`);
}

export function processArgs(args: string[]): ArgumentConfig {
  const pairs = splitEvery(2, args);

  const inputArguments = pairs.find((p) => p[0] === '--inputConfig');

  if (!inputArguments) {
    console.error(`Missing '--inputConfig' argument.\n`);
    printHelp();
    process.exit(1);
  }

  const bucketArguments = pairs.find((p) => p[0] === '--bucket');

  if (!bucketArguments) {
    console.error(`Missing '--bucket' argument.\n`);
    printHelp();
    process.exit(1);
  }

  return {
    inputConfig: inputArguments[1],
    bucket: bucketArguments[1],
  };
}

const bucketRegex = /^[a-zA-Z0-9\-_]+$/;
const prefixRegex = /^[/a-zA-Z0-9\-_]+$/;
const linkRegex = /^[/a-zA-Z0-9\-_]+\/$/;

export function validateConfig(bucket: string, prefix: string | undefined, links: LinkRedirect[]) {
  if (!bucketRegex.test(bucket)) {
    throw new Error('Invalid bucket name passed');
  }

  if (prefix !== undefined && !prefixRegex.test(prefix)) {
    throw new Error('Invalid prefix for link redirects.');
  }

  links.forEach((l) => {
    if (!linkRegex.test(l.from)) {
      throw new Error('Invalid path to redirect from.');
    }

    if (!linkRegex.test(l.to)) {
      throw new Error('Invalid path to redirect to.');
    }
  });
}

export async function runGenerator(args: string[]) {
  const argumentConfig = processArgs(args);

  const currentWorkingDirectoryPath = process.cwd();

  const inputConfigPath = resolve(currentWorkingDirectoryPath, argumentConfig.inputConfig);

  try {
    await access(inputConfigPath, constants.R_OK);
  } catch (e) {
    console.error('Unable to read input file:', e);
    printHelp();
    process.exit(1);
  }

  // We use the import syntax here to handle both JSON and JS cases.
  const inputConfigContents = (await import(inputConfigPath)).default as S3RedirectConfig;

  if (!inputConfigContents || typeof inputConfigContents !== 'object') {
    console.error('Unable to read input config contents. Invalid config read.');
    printHelp();
    process.exit(1);
  }

  validateConfig(argumentConfig.bucket, inputConfigContents.prefix, inputConfigContents.links);

  try {
    // Use the ghetto for loop to sequentially perform each step. Concurrency can be added later, if needed.
    for (let i = 0; i < inputConfigContents.links.length; i++) {
      const link = inputConfigContents.links[i];
      await putS3ObjectWithRedirect(argumentConfig.bucket, inputConfigContents.prefix, link);
    }
  } catch (e) {
    console.error('Unable to upload redirect to S3:', e);
    process.exit(1);
  }
}
