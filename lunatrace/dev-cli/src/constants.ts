/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import * as path from 'path';

export const currentDir = process.cwd();

export const bslDir = path.join(currentDir, '../bsl');
export const hasuraDir = path.join(bslDir, 'hasura');
export const kratosDir = path.join(bslDir, 'ory/kratos');

export const tmuxpConfgFile = path.join(bslDir, 'generated-lunatrace-tmuxp.yaml');
export const waitForItScript = path.join(currentDir, '../../tools/service-scripts/wait-for-it.sh');
