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

import fs from 'fs';

const path = require('path');

const axios = require('axios');
const decompress = require('decompress');
const decompressTargz = require('decompress-targz');
const ProgressBar = require('progress');

const binUrl = require('./format-bin-url');

const binFolder = path.resolve(__dirname, '..', 'bin');
const tarPath = path.resolve(binFolder, 'cli_bin.tar.gz');

async function downloadBinary(url: any) {
  console.log('Downloading LunaSec CLI binary from ', url);
  // make the bin folder
  fs.mkdirSync(binFolder, { recursive: true });
  const { data, headers } = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  const progressBar = new ProgressBar('-> Downloading LunaSec CLI bin [:bar] :percent :etas', {
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 1,
    total: parseInt(headers['content-length']),
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  data.on('data', (chunk: string | any[]) => progressBar.tick(chunk.length));

  const writer = fs.createWriteStream(tarPath);
  data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}
async function downloadAndDecompressCli() {
  if (fs.existsSync(binFolder)) {
    return; // Todo: make sure this skip doesn't happen when the package is updated or we will accidentally keep the old binary
  }
  await downloadBinary(binUrl).catch((e: Error) => {
    throw new Error(`Error downloading LunaSec CLI bin from github: ${e.toString()}`);
  });
  // Delete old decompressed files here if needed
  console.log('Extracting...');
  await decompress(tarPath, path.resolve(__dirname, '..', 'bin'), { plugins: [decompressTargz()] }).catch(
    (e: Error) => {
      throw new Error(`Error decompressing LunaSec CLI bin ${e.toString()}`);
    }
  );
  console.log('LunaSec CLI installed');
  fs.unlinkSync(tarPath); // Deletes the tar file
}

if (process.env.IS_LUNASEC_CI === 'true') {
  console.log('skipping CLI bin download, we are in CI');
  process.exit(0);
}
downloadAndDecompressCli().catch((e) => {
  console.error('Error Installing LunaSec CLI: ', e);
  process.exit(1);
});
