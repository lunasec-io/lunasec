/*
 * Copyright 2023 by LunaSec (owned by Refinery Labs, Inc)
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
import fs from 'fs';

import { expect, test } from '@oclif/test';

const basePath = process.cwd() + '/src/tests/fixtures/npm-project';

describe('replace package in tree', () => {
  // Copy the `package.json` and `package-lock.json` files to a temporary directory
  function copyPackageFiles(): string {
    const path = `/tmp/npm-project-test-${Math.random()}`;
    fs.mkdirSync(path);
    fs.copyFileSync(`${basePath}/package.json`, `${path}/package.json`);
    fs.copyFileSync(`${basePath}/package-lock.json`, `${path}/package-lock.json`);
    return path;
  }

  const testPath = copyPackageFiles();

  test
    .stdout()
    .command(['replace-package', testPath, '--old', 'got-scraping@3.2.8', '--new', 'got-scraping@3.2.12'])
    .it('replace simple package', (ctx) => {
      const newPackageLock = fs.readFileSync(`${testPath}/package-lock.json`, 'utf8');
      expect(newPackageLock).to.not.contain('got-scraping-3.2.8.tgz');
      expect(newPackageLock).to.contain('got-scraping-3.2.12.tgz');

      expect(ctx.stdout).to.contain('Updated 1 package');

      // Delete the temporary directory
      fs.rmSync(testPath, { recursive: true, force: true });
    });
});
