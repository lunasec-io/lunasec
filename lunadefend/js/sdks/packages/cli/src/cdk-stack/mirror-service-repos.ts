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
import { CreateRepositoryCommand, ECRClient } from '@aws-sdk/client-ecr';

import { mirrorRepo } from '../docker/mirror';

const awsRegion = 'us-west-2';

export async function mirrorRepos(accountID: string, version: string) {
  const serviceToImageName: Record<string, string> = { 'tokenizer-backend': '', 'analytics-collector': '' };

  const lunasecRepoBase = 'lunasec';

  const accountRepoBase = `${accountID}.dkr.ecr.us-west-2.amazonaws.com`;

  const ecrClient = new ECRClient({ region: awsRegion });

  await Promise.all(
    Object.keys(serviceToImageName).map(async (serviceName: string) => {
      console.log(`Downloading ${serviceName}...`);
      const cmd = new CreateRepositoryCommand({
        repositoryName: serviceName,
      });

      try {
        await ecrClient.send(cmd);
      } catch (e: any) {
        if (e.name !== 'RepositoryAlreadyExistsException') {
          throw e;
        }
      }

      const imageName = `${lunasecRepoBase}/${serviceName}`;
      const newImageName = `${accountRepoBase}/${serviceName}`;
      mirrorRepo(imageName, newImageName, version);
      serviceToImageName[serviceName] = `${newImageName}:${version}`;
    })
  );
  return serviceToImageName;
}
