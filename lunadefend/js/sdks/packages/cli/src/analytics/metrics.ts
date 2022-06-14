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

/* eslint-disable */

import { execSync } from 'child_process';
import { randomUUID } from 'crypto';
import fs from 'fs';
import { access, mkdir, readFile, writeFile } from 'fs/promises';
import os from 'os';
import path from 'path';

import { cliAnalyticsServer, cliMetricTag, metadataFile } from '../constants/cli';
import { LunaSecStackEnvironment } from '../docker-compose/constants';
import { post } from '../utils/http';

import { CliMetric, CliMetricSystemInfo, LunaSecCliMetadata } from './types';


const { version } = require('../../package.json');

function getCliVersion(cmd: string) {
  try {
    return execSync(cmd, {
      encoding: 'utf-8',
    });
  } catch (e) {
    return '-1';
  }
}

function getCliSystemInfo(): CliMetricSystemInfo {
  return {
    docker_version: getCliVersion('docker --version'),
    docker_compose_version: getCliVersion('docker-compose --version'),
    node_version: getCliVersion('node --version'),
    host_platform: os.platform(),
    host_release: os.release(),
  };
}

async function getCliMetadata() {
  try {
    const metadataFileContents = await readFile(metadataFile, {
      encoding: 'utf-8',
    });

    return JSON.parse(metadataFileContents) as LunaSecCliMetadata;
  } catch (e) {
    console.debug(e);
    return {
      user_id: 'deadbeef-cafebabe-f00ddead-00000000',
    };
  }
}

async function pathExists(path: string): Promise<boolean> {
  return await access(path, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
}

async function saveCliMetadata(metadata: LunaSecCliMetadata) {
  try {
    const metadataDir = path.dirname(metadataFile);
    const dirExists = await pathExists(metadataDir);
    if (!dirExists) {
      await mkdir(metadataDir, {
        recursive: true,
      });
    }

    await writeFile(metadataFile, JSON.stringify(metadata));
  } catch (e) {
    console.debug(e);
  }
}

export async function ensureMetadata(): Promise<LunaSecCliMetadata> {
  const fileExists = await pathExists(metadataFile);
  if (!fileExists) {
    const metadata: LunaSecCliMetadata = {
      user_id: randomUUID(),
    };
    await saveCliMetadata(metadata);
    return metadata;
  }
  return await getCliMetadata();
}

export async function getLunaSecMetrics(): Promise<LunaSecMetrics> {
  const metadata = await ensureMetadata();
  return new LunaSecMetrics(metadata);
}

export class LunaSecMetrics {
  metadata: LunaSecCliMetadata;

  constructor(metadata: LunaSecCliMetadata) {
    this.metadata = metadata;
  }

  async push(command: string, env: LunaSecStackEnvironment, success: boolean, errorMessage?: string) {
    const disableMetrics = process.env.LUNASEC_DISABLE_CLI_METRICS;
    if (disableMetrics) {
      console.debug('skipping metrics reporting for the CLI');
      return;
    }

    const userId = this.metadata.user_id;

    const metric: CliMetric = {
      version: version,
      user_id: userId,
      command: command,
      env: env,
      success: success,
      error_message: errorMessage || '',
      system_info: getCliSystemInfo(),
    };

    try {
      const resp = await post(cliAnalyticsServer, metric);
      console.debug(`pushed metrics to ${cliAnalyticsServer}: ${JSON.stringify(metric)}`);
      console.debug(resp);
    } catch (e) {
      // TODO (cthompson) is there anything else we want to do when handling this error?
      console.debug(e);
    }
  }
}
