/*
 * Copyright 2023 by LunaSec (owned by Refinery Labs, Inc)
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
import { Command } from '@oclif/core';

export default class World extends Command {
  static description = 'Say hello world';

  static examples = [
    `<%= config.bin %> <%= command.id %>
hello world! (./src/commands/hello/world.ts)
`,
  ];

  static flags = {};

  static args = {};

  // eslint-disable-next-line @typescript-eslint/require-await
  async run(): Promise<void> {
    this.log('hello world! (./src/commands/hello/world.ts)');
  }
}
