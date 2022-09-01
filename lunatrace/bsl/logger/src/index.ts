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
import { AsyncLocalStorage } from 'async_hooks';
import * as util from 'util';

import { getCallSite } from './callsite';
import { LevelChoice, LoggerContext, LoggerOptions, LogMethodArgs, LogObj, Transport } from './types';

export * from './types';
export * from './json-transport';
export * from './logio-transport';
export * from './file-transport';

const defaultLoggerName = 'default';

const defaultLoggerOptions: LoggerOptions = {
  loggerName: defaultLoggerName,
};

const defaultLoggerContext: LoggerContext = {};

function mergeObjectIntoRecord(record: Record<string, string>, obj: object): Record<string, string> {
  const copiedRecord = {
    ...record,
  };
  Object.entries(obj).forEach(([k, v]) => {
    copiedRecord[k] = anythingToString(v);
  });
  return copiedRecord;
}

function anythingToString(arg: unknown): string {
  if (typeof arg === 'string') {
    return arg;
  }
  if (arg instanceof Error) {
    return arg.stack || arg.toString();
  }
  return util.inspect(arg);
}

export class LunaLogger {
  options: LoggerOptions = defaultLoggerOptions;
  context: Record<string, string>;
  storage: AsyncLocalStorage<{ context: LoggerContext }>;
  public transports: Array<Transport> = [];

  constructor(options?: LoggerOptions, additionalFields?: Record<string, unknown>) {
    this.options = options || defaultLoggerOptions;
    this.storage = new AsyncLocalStorage();
    this.context = {
      // if additional fields are provided, then merge them into the default logger fields
      ...(additionalFields ? mergeObjectIntoRecord(defaultLoggerContext, additionalFields) : {}),
    };
  }

  public child(name: string, additionalFields?: Record<string, unknown>): LunaLogger {
    const newContext = mergeObjectIntoRecord(this.context, additionalFields || {});
    const childLogger = new LunaLogger(
      {
        ...this.options,
        loggerName: name,
      },
      newContext
    );
    childLogger.transports = this.transports;
    childLogger.storage = this.storage; // Bit sketchy because child loggers will be able to write to the parents or other child loggers storage using provideFields()..ok for now though and limited to one thread
    return childLogger;
  }

  // This node wizardry is like stack / thread storage.  Anywhere in this callstack, these fields will be used by the logger
  // It HAS to take a function for the wrapping to work. Wrapped it in a promise since that simplifies usage and keeps the user from having to generate their own new Promise()
  public provideFields<T>(fields: Record<string, unknown>, callback: () => T): Promise<T> {
    return new Promise((resolve, reject) => {
      // .run will overwrite the previous store (if any) from any higher level provideFields calls, so we merge them together here before overwriting
      const existing = this.storage.getStore();
      const context = existing ? existing.context : {};
      const newFields: LoggerContext = mergeObjectIntoRecord(context, fields);
      this.storage.run({ context: newFields }, () => {
        // Note that if the callback returns a promise, this will be handled cleanly by resolve()..so we can pass async () =>  functions
        resolve(callback());
      });
    });
  }

  public addTransport(transport: Transport): void {
    this.transports.push(transport);
  }

  public debug(...args: LogMethodArgs): void {
    this.dolog('debug', args);
  }

  public log(...args: LogMethodArgs): void {
    this.dolog('info', args);
  }

  public info(...args: LogMethodArgs): void {
    this.dolog('info', args);
  }

  public warn(...args: LogMethodArgs): void {
    this.dolog('warn', args);
  }

  public error(...args: LogMethodArgs): void {
    this.dolog('error', args);
  }

  public dolog(level: LevelChoice, args: LogMethodArgs): void {
    const now = new Date();

    const threadStorage = this.storage.getStore();
    const contextFromStorage = threadStorage ? threadStorage.context : {};

    const logObject: LogObj = {
      level,
      timeEpoch: now.getTime(),
      name: this.options.loggerName || defaultLoggerName,
      message: '',
      context: {
        ...contextFromStorage,
        ...this.context,
      },
      timePretty: `${now.toDateString()} ${now.toTimeString()}`,
    };

    if (this.options.trace || level === 'error') {
      const callInfo = getCallSite();
      if (callInfo) {
        Object.assign(logObject, callInfo);
      }
    }

    args.forEach((arg) => {
      // If the argument is an object, then add its keys to the context object
      if (this.isObject(arg)) {
        const argAsObject = arg as object;
        logObject.context = mergeObjectIntoRecord(logObject.context, argAsObject);
        return;
      }

      const argAsString = anythingToString(arg);
      // Otherwise, just glob everything onto the message
      logObject.message = logObject.message.concat(argAsString);
    });
    this.transport(logObject);
    return;
  }

  private transport(logObj: LogObj) {
    this.transports.forEach((t) => {
      t.send(logObj);
    });
  }

  private isObject(arg: unknown): boolean {
    // sigh..ok javascript, if you say so
    return typeof arg === 'object' && !Array.isArray(arg) && arg !== null;
  }

  private isString(arg: unknown): boolean {
    return typeof arg === 'string' || arg instanceof String;
  }
}
