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

import os from 'os';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json');
const packageVersion: string = packageJson.version;

function getOsName() {
  const osNameMap: Record<string, string> = {
    linux: 'Linux',
    darwin: 'Darwin',
    win32: 'Windows',
  };
  const nodeOsName = os.platform();
  if (!osNameMap[nodeOsName]) {
    throw new Error(
      `Operating system ${nodeOsName} is not supported by LunaSec CLI, you must compile and use your own binary and cannot use this package`
    );
  }
  return osNameMap[nodeOsName];
}

function getArchName() {
  const archNameMap: Record<string, string> = {
    x64: 'x86_64',
    arm64: 'arm64',
    x32: 'i386',
  };
  if (!archNameMap[process.arch]) {
    throw new Error('LunaSec Unsupported CPU Architecture');
  }
  if (process.arch === 'arm64') {
    console.warn(
      'ARM 64 CPU detected by LunaSec CLI Installer.  CLI Support for M1 Macintosh is experimental, please tell us if it works.'
    );
  }
  return archNameMap[process.arch];
}

module.exports = `https://github.com/lunasec-io/lunasec-monorepo/releases/download/v${packageVersion}/lunasec_${packageVersion}_${getOsName()}_${getArchName()}.tar.gz`;
