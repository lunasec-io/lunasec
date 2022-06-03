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
import path from 'path';

export const debug = process.env.DEBUG || false;

export const lunaSecDir = '.lunasec';

export const awsResourcesOutputFile = 'aws_resources.json';

export const cliAnalyticsServer = 'https://production.deployment-info.lunasec.io/record/cli';

// TODO (cthompson) pick this up from the environment
export const awsRegion = 'us-west-2';

export const cliMetricTag = 'cli';

export const metadataFile = path.join(os.homedir(), lunaSecDir, 'metadata.json');
export const buildsFolder = path.join(os.homedir(), lunaSecDir, 'builds');

export const outputDir = './lunadefend/outputs';
