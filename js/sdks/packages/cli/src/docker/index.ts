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
import { runCommand } from '../utils/exec';

export function pullImage(imageName: string) {
  console.debug(`pulling image ${imageName}`);

  const cmd = `sudo docker pull ${imageName}`;

  const r = runCommand(cmd, false);
  if (r.status !== 0) {
    console.error(r.stdout);
    console.error(r.stderr);
    throw new Error(`command did not complete successfully: ${cmd}`);
  }
}

export function tagImage(imageName: string, tag: string) {
  console.debug(`tagging image ${imageName} with ${tag}`);
  const cmd = `sudo docker tag ${imageName} ${tag}`;
  const r = runCommand(cmd, false);
  if (r.status !== 0) {
    console.error(r.stdout);
    console.error(r.stderr);
    throw new Error(`command did not complete successfully: ${cmd}`);
  }
}

export function pushImageToRemote(imageName: string) {
  console.debug(`pushing image ${imageName}`);
  const cmd = `sudo docker push ${imageName}`;
  const r = runCommand(cmd, false);
  if (r.status !== 0) {
    console.error(r.stdout);
    console.error(r.stderr);
    throw new Error(`command did not complete successfully: ${cmd}`);
  }
}
