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
import { ChildProcessWithoutNullStreams, execSync, ExecSyncOptionsWithBufferEncoding, spawn } from 'child_process';

export const signals: NodeJS.Signals[] = [`SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`];
export const processSignals: string[] = ['exit', 'uncaughtException'];

interface RunCommandResult {
  status: number;
  message?: string;
  stderr?: string;
  stdout: string;
}

interface RunCommandError {
  status: number;
  message?: string;
  stderr?: Buffer;
  stdout: Buffer;
}

export interface RunCommandWithHealthcheckOptions {
  healthcheck?: () => Promise<boolean>;
  exitHandler?: (code: number, stderr: string) => Promise<void>;
  streamStdout?: boolean;
  onStdin?: Generator<undefined, void, string>;
  doNotExitProcess?: boolean;
}

export function throwOnFailure(r: RunCommandResult, cmd?: string) {
  if (r.status !== 0) {
    console.error(r.stdout);
    console.error(r.stderr);
    const fmtCmd = cmd ? `: ${cmd}` : '';
    throw new Error(`command did not complete successfully${fmtCmd}`);
  }
}

export function runCommand(command: string, streamStdio?: boolean): RunCommandResult {
  console.debug(`running command: ${command}`);

  const options: ExecSyncOptionsWithBufferEncoding = {
    stdio: streamStdio ? 'inherit' : 'pipe',
  };

  try {
    const r = execSync(`${command}`, options);
    return {
      status: 0,
      stdout: r.toString(),
    };
  } catch (e) {
    const err = e as RunCommandError;
    return {
      status: err.status,
      message: err.message,
      stderr: err.stderr ? err.stderr.toString() : '',
      stdout: err.stdout ? err.stdout.toString() : '',
    };
  }
}

function timeout(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

function registerSignalHandlers(cmd: ChildProcessWithoutNullStreams) {
  signals.forEach((eventType) => {
    process.on(eventType, () => {
      cmd.kill(eventType);
    });
  });
  processSignals.forEach((eventType) => {
    process.on(eventType, () => {
      cmd.kill('SIGINT');
    });
  });
}

export function runCommandWithHealthcheck(command: string, options: RunCommandWithHealthcheckOptions) {
  console.debug(`running command: ${command}`);

  const cmd = spawn('sh', ['-c', command]);

  let stderr = '';

  cmd.stdout.on('data', (data: Buffer) => {
    const strData = data.toString();
    if (options.streamStdout) {
      console.log(strData);
    }

    if (options.onStdin) {
      options.onStdin.next(strData);
    }
  });

  cmd.stderr.on('data', (data: string) => {
    const strData = data.toString();
    stderr += strData;
    console.error(strData);
  });

  cmd.on('close', (code) => {
    if (options.exitHandler) {
      void options.exitHandler(code === null ? 0 : code, stderr);
    }

    if (options.doNotExitProcess) {
      return;
    }

    if (code !== null) {
      process.exit(code);
    }
    process.exit(0);
  });

  registerSignalHandlers(cmd);

  async function waitForAppToBeReady() {
    if (options.healthcheck === undefined) {
      // no healthcheck is defined, assume the app is healthy
      return;
    }

    let attempts = 0;
    let healthy = false;
    while (!healthy && attempts < 1000) {
      await timeout(1000);
      attempts++;
      healthy = await options.healthcheck();
    }

    if (!healthy) {
      throw new Error(`command did not arrive at healthy state: ${command}`);
    }
  }

  return waitForAppToBeReady();
}
