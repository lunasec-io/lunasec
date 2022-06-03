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
import { exec } from 'child_process';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line import/no-unresolved
import { LinkRedirect } from './types.js';

export function putS3ObjectWithRedirect(
  bucket: string,
  prefix: string | undefined,
  linkRedirect: LinkRedirect
): Promise<void> {
  // We have to remove to leading slash for S3 to be happy.
  const redirectFrom = `${prefix || ''}${linkRedirect.from}`.substring(1);
  const redirectTo = `${prefix || ''}${linkRedirect.to}`;

  const blankFilePath = resolve(dirname(fileURLToPath(import.meta.url)), '../blank-file.txt');

  return new Promise((resolve, reject) => {
    exec(
      `aws s3api put-object --bucket ${bucket} --acl public-read --body ${blankFilePath} --key ${redirectFrom}index.html --website-redirect-location ${redirectTo}`,
      (error) => {
        if (error) {
          return reject(error);
        }

        console.log(`Added redirect: /${redirectFrom} -> ${redirectTo}`);

        resolve();
      }
    );
  });
}
