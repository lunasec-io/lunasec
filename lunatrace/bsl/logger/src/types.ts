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

export interface LoggerOptions {
  loggerName?: string;
  trace?: boolean;
}

export type LoggerContext = Record<string, any>;

export const logLevels = ['debug', 'info', 'warn', 'error'] as const;
export type LevelChoice = typeof logLevels[number];

export interface LogObj {
  level: LevelChoice;
  timeEpoch: number;
  timePretty: string;
  name: string;
  message: string;
  context: object;
}

export interface Transport {
  send: (log: LogObj) => void;
}

// This is the type of the splatted args to all our log functions
// This seems like a cleaner alternative to method overloading since we need this many times, only downside is args wont be named in tooltip
// export type LogMethodArgs = [LoggerContext, string | undefined] | [string];
export type LogMethodArgs = Array<unknown>;
