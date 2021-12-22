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
import path from 'path';

import { getOutputName } from '../cdk-stack/stack';
import { LunaSecStackName } from '../cdk-stack/types';
import { buildsFolder } from '../constants/cli';

interface ResourcesCmdOptions {
  buildDir?: string;
  json: boolean;
}

function getBuildDir(buildDir?: string) {
  if (!fs.existsSync(buildsFolder)) {
    throw new Error('There are no LunaSec deploys. Please use `lunasec deploy` to first deploy the stack.');
  }

  const dirs = fs.readdirSync(buildsFolder).sort().reverse();

  const latestBuildDir = dirs.length ? dirs[0] : undefined;

  if (buildDir) {
    return buildDir;
  }

  if (latestBuildDir) {
    return path.join(buildsFolder, latestBuildDir);
  }
  return undefined;
}

export function resourcesCmd(options: ResourcesCmdOptions) {
  const buildDir = getBuildDir(options.buildDir);

  if (buildDir === undefined) {
    throw new Error('There are no LunaSec deploys. Please use `lunasec deploy` to first deploy the stack.');
  }

  const outputsFilename = path.join(buildDir, 'outputs.json');
  const outputs = fs.readFileSync(outputsFilename, 'utf-8');
  const parsedOutputs = JSON.parse(outputs);

  const stackOutputs = parsedOutputs[LunaSecStackName] as Record<string, string>;
  if (stackOutputs === undefined) {
    throw new Error(`unable to locate outputs for stack: ${LunaSecStackName} in stack output file ${outputsFilename}`);
  }

  if (options.json) {
    console.log(JSON.stringify(stackOutputs, null, 2));
    return;
  }

  console.log(`Tokenizer URL: ${stackOutputs[getOutputName('gateway')]}`);
  console.log(`Tokenizer Secret ARN: ${stackOutputs[getOutputName('tokenizer-secret')]}`);
  console.log(``);
  console.log(`Tables:`);
  console.log(`  Keys Table: ${stackOutputs[getOutputName('keys-table')]}`);
  console.log(`  Grants Table: ${stackOutputs[getOutputName('grants-table')]}`);
  console.log(`  Metadata Table: ${stackOutputs[getOutputName('metadata-table')]}`);
}
