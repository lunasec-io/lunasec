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
import { spawn } from 'child_process';
import { Readable } from 'stream';
import zlib from 'zlib';

import { LunaTraceAssetType } from '../types/cli';
import { log } from '../utils/log';

function snapshotAssetArgs(
  assetType: LunaTraceAssetType,
  assetName: string,
  gitBranch: string,
  gitCommit?: string,
  workspace?: string
) {
  const baseCmdArgs = [
    '--debug',
    '--log-to-stderr',
    '--json',
    'snapshot',
    '--skip-upload',
    '--stdout',
    '--git-branch',
    gitBranch,
  ];

  if (gitCommit) {
    baseCmdArgs.push('--git-commit', gitCommit);
  }

  if (assetType === 'file') {
    return [...baseCmdArgs, assetType, '--stdin', assetName];
  }
  if (assetType === 'repository') {
    if (workspace === undefined) {
      log.error('asset is of type repository, but no workspace directory provided', {
        assetName,
      });
      return null;
    }

    return [...baseCmdArgs, '--workspace', workspace, assetType, assetName];
  }
  log.error('unknown asset type', {
    assetType,
    assetName,
  });
  return null;
}

export function generateSbomFromAsset(
  assetType: LunaTraceAssetType,
  assetName: string,
  gitBranch: string,
  gitCommit?: string,
  options?: { inputStream?: Readable; workspace?: string }
) {
  const cmdArgs = snapshotAssetArgs(assetType, assetName, gitBranch, gitCommit, options?.workspace);
  if (cmdArgs === null) {
    return null;
  }

  const logger = log.child('generate-sbom-from-asset', {
    assetType,
    assetName,
    gitBranch,
    gitCommit,
  });

  const lunatraceCli = spawn('lunatrace', cmdArgs);
  logger.info('lunatrace spawned at pid', {
    pid: lunatraceCli.pid,
  });

  lunatraceCli.stderr.on('data', (data) => {
    logger.info(`lunatrace cli stderr`, {
      data: data.toString(),
    });
  });

  lunatraceCli.on('error', (error) => {
    logger.error('lunatrace cli error', {
      error: error.message,
    });
    // todo: might get gobbled?
    // throw error;
  });

  // if an input stream was provided, asset will be passed to the CLI via stdin
  if (options && options.inputStream) {
    const inputStream = options.inputStream;
    inputStream.on('data', (chunk) => lunatraceCli.stdin.write(chunk));
    inputStream.on('end', () => {
      lunatraceCli.stdin.end(() => {
        logger.info('closing stdin');
      });
      inputStream.destroy();
    });
    inputStream.on('error', (e) => {
      // throw e;
      logger.error('error closing input stream', e);
    });
  }

  lunatraceCli.stdout.on('data', (chunk) => {
    logger.info('lunatrace cli emitted stdout', {
      stdout: chunk.toString().length,
    });
  });

  lunatraceCli.stdout.on('close', () => {
    logger.info('lunatrace outstream ended');
  });

  lunatraceCli.on('close', () => logger.info('lunatrace process closed'));
  // gzip the sbom stream
  return lunatraceCli.stdout.pipe(zlib.createGzip());
}
