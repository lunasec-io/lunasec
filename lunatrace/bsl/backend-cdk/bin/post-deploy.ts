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
import { readFileSync } from 'fs';

import * as AWS from 'aws-sdk';
/**
 * Configure the AWS region
 */

const region = process.env.AWS_REGION;
if (!region) {
  throw Error('AWS_REGION must be defined in environment');
}
AWS.config.update({ region });

const appName = process.env.APP_NAME as string;
if (!appName) {
  throw Error('APP_NAME must be defined in environment');
}

async function setDatabaseConnectionUrl(): Promise<void> {
  const cdkOutputsData = JSON.parse(readFileSync('cdk.outputs.json', 'utf-8'));

  const masterSecretArn = cdkOutputsData[`${appName}-HasuraStack`].HasuraDatabaseMasterSecretArn;

  const secretsmanager = new AWS.SecretsManager({ apiVersion: '2017-10-17' });

  const getMasterSecretParams: AWS.SecretsManager.GetSecretValueRequest = {
    SecretId: masterSecretArn,
  };

  const masterSecret = await secretsmanager.getSecretValue(getMasterSecretParams).promise();
  if (!masterSecret.SecretString) {
    throw Error('Did not get SecretString');
  }
  const connectionDetails = JSON.parse(masterSecret.SecretString) as {
    username: string;
    password: string;
    dbname: string;
    engine: string;
    host: string;
    port: string;
  };

  const password = encodeURIComponent(connectionDetails.password);

  const connectionString = `postgres://${connectionDetails.username}:${password}@${connectionDetails.host}:${connectionDetails.port}/${connectionDetails.dbname}`;
  console.log(connectionString);
}

/**
 * Perform actions required after to the execution of the CDK stack
 */

async function main(): Promise<void> {
  await setDatabaseConnectionUrl();
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
