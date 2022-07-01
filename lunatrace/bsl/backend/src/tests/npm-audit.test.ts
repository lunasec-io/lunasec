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
import fs from 'fs';
import path from 'path';

import tmp, { DirectoryResult } from 'tmp-promise';

import { AuditReport } from '../types/npm-audit';
import { doAudit, writeManifestsToDisk } from '../workers/queue/helpers/npm-audit';
describe('npm audit', () => {
  let npmDir: DirectoryResult;
  let yarnDir: DirectoryResult;
  beforeEach(async () => {
    const manifestFixtures = path.resolve(__dirname, '../fixtures/manifests');
    const packageJsonBody = fs.readFileSync(manifestFixtures + '/package.json').toString();
    const npmLockBody = fs.readFileSync(manifestFixtures + '/package-lock.json').toString();
    const yarnLockBody = fs.readFileSync(manifestFixtures + '/yarn.lock').toString();
    npmDir = await writeManifestsToDisk(packageJsonBody, npmLockBody, 'package-lock.json');
    yarnDir = await writeManifestsToDisk(packageJsonBody, yarnLockBody, 'yarn.lock');
  });
  afterEach(async () => {
    await npmDir.cleanup();
    await yarnDir.cleanup();
  });
  describe('manifest writing', () => {
    it('writes manifest files', async () => {
      const files = fs.readdirSync(npmDir.path);
      expect(files).toHaveLength(2);
      expect(files).toContain('package-lock.json');
      //cleanup
      await npmDir.cleanup();
      const itThrew = jest.fn();
      // make sure its gone
      try {
        expect(fs.readdirSync(npmDir.path)).toThrow();
      } catch {
        itThrew();
      }
      expect(itThrew).toBeCalled();
      // recreate the tmpdir so the cleanup hook doesnt fail
      npmDir = await tmp.dir();
    });
  });

  describe('calling into package managers', () => {
    it('calls npm', async () => {
      // execute
      const rawAudit = await doAudit(npmDir.path, false);
      // assert
      const audit: AuditReport = JSON.parse(rawAudit);
      expect(audit).toHaveProperty('vulnerabilities');
    });

    // it('calls yarn', async () => {
    //   // execute
    //   const rawAudit = await doAudit(yarnDir.path, true);
    //   // assert
    //   const audit: AuditReport = JSON.parse(rawAudit);
    //   console.log('yarn audit!!!!!!!!!!!!!', audit);
    //   expect(audit).toHaveProperty('vulnerabilities');
    // });
  });
});
