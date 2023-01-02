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
import dotenv from 'dotenv';
import { z } from 'zod';

import { commonEnvVarKeys } from './common-env-vars';

dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env' : '.env.dev' });

const missingEnvVars: string[] = [];

type EnvVar<S extends z.Schema> = {
  varKey: string;
  backupVarKey?: string;
  defaultValue?: z.infer<S>;
  castTo: S;
};

// Takes an env var key object from "common-env-vars.ts", reads it from the environment, and returns a scalar or throws if it cannot
function checkEnvVar<E extends EnvVar<z.Schema>>(varConf: E): z.infer<E['castTo']> {
  const envVar = process.env[varConf.varKey];
  const backupVar = varConf.backupVarKey ? process.env[varConf.backupVarKey] : null;
  // If the environment variable is not set, and the value must come from the environment,
  // AND we are in production and the default value is not defined.
  // then throw an error
  if (!envVar && !backupVar && varConf.defaultValue === undefined && process.env.NODE_ENV !== 'test') {
    missingEnvVars.push(`${varConf.varKey}${varConf.backupVarKey ? ` and backup var ${varConf.backupVarKey}` : ''}`);
    // throw new Error(`Missing ${envVarKey} env var ${backupEnvVarKey ? `and backup var ${backupEnvVarKey}` : ''}`);
  }
  const stringValue = envVar || backupVar;
  if (!stringValue) {
    return varConf.defaultValue;
  }
  return varConf.castTo.parse(stringValue);
}

type VarName = keyof typeof commonEnvVarKeys;
type EnvVars = {
  [name in VarName]: z.infer<typeof commonEnvVarKeys[name]['castTo']>;
};

// Build the env vars and store them in the require cache as an export of this file
const partialEnvironmentVars: Partial<EnvVars> = {};

Object.keys(commonEnvVarKeys).forEach((keyName) => {
  const varName = keyName as VarName;
  const varConf: EnvVar<typeof commonEnvVarKeys[typeof varName]['castTo']> = commonEnvVarKeys[varName];
  // I can't figure out why this ignore is needed, but so be it
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  partialEnvironmentVars[varName] = checkEnvVar(varConf);
});

if (missingEnvVars.length > 0) {
  throw new Error(`Missing the following environment vars: ${missingEnvVars.toString()}`);
}
export const envVars = partialEnvironmentVars as EnvVars;
