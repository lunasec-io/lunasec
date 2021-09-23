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
import { BuildActionFunctionConfig } from '../api/types';

export enum DeploymentStage {
  DEV = 'DEV',
  PROD = 'PROD',
}

export interface FunctionConfig {
  projectID: string;
  functions: BuildActionFunctionConfig[];
}

export interface SecureResolverSdkConfig {
  stage: DeploymentStage;
  deploymentId: string;
  appDir?: string;
  language?: string;
  functionsConfigPath?: string;
  functionsConfig?: FunctionConfig;
  deploymentSecret: string;
  containerHeaders: string;
  deploymentUrl: string; // (forrest) it's possible I misunderstood and this is meant to come from an environment var set during deployment and not the users config
}
