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
import {AsyncLocalStorage} from 'async_hooks';

import {getCallSite} from './callsite';
import {BaseLogObj, LevelChoice, LoggerOptions, LogMethodArgs, LogObj, Transport} from './types';

export * from './types';
export * from './json-transport';

const defaultLoggerFields: BaseLogObj = {
  loggerName: 'default'
};

export class LunaLogger {
  options: LoggerOptions = {};
  baseLogObj: BaseLogObj;
  storage: AsyncLocalStorage<{ additionalFields: Record<string, unknown> }>;
  public transports: Array<Transport> = [];

  constructor(options?: LoggerOptions, additionalFields?: Record<string, unknown>) {
    this.options = options || {};
    this.storage = new AsyncLocalStorage();
    this.baseLogObj = {...defaultLoggerFields, ...additionalFields};
  }

  // This node wizardry is like stack / thread storage.  Anywhere in this callstack, these fields will be used by the logger
  // It HAS to take a function for the wrapping to work. Wrapped it in a promise since that simplifies usage and keeps the user from having to generate their own new Promise()
  public provideFields<T>(fields: Record<string, unknown>, callback: () => T): Promise<T> {
    return new Promise((resolve, reject) => {
      // .run will overwrite the previous store (if any) from any higher level provideFields calls, so we merge them together here before overwriting
      const existing = this.storage.getStore();
      const newFields: Record<string, unknown> = existing ? {...existing.additionalFields, ...fields} : {...fields};
      this.storage.run({additionalFields: newFields}, () => {
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

  public child(additionalFields: Record<string, unknown>): LunaLogger {
    const childLogger = new LunaLogger(this.options, {...this.baseLogObj, ...additionalFields});
    childLogger.transports = this.transports;
    childLogger.storage = this.storage; // Bit sketchy because child loggers will be able to write to the parents or other child loggers storage using provideFields()..ok for now though and limited to one thread
    return childLogger;
  }

  public dolog(level: LevelChoice, args: LogMethodArgs): void {
    const now = new Date();

    const threadStorage = this.storage.getStore();
    const fieldsFromThread = threadStorage ? threadStorage.additionalFields : {};

    const logObject: LogObj = {
      level,
      timeEpoch: now.getTime(),
      message: '',
      timePretty: `${now.toDateString()} ${now.toTimeString()}`,
      ...this.baseLogObj,
      ...fieldsFromThread
    };

    if (this.options.trace || level === 'error') {
      const callInfo = getCallSite();
      if (callInfo) {
        Object.assign(logObject, callInfo);
      }
    }

    args.forEach((arg, index) => {
      // When the first arg is an object, merge it to the root log object, just like pino
      if (index === 0 && this.isObject(arg)) {
        Object.assign(logObject, arg);
        return;
      }
      // Otherwise just glob everything onto the message, so we can still do logs like "value is: {some:'thing'}", just like console.log
      const argAsString = this.anythingToString(arg);
      logObject.message = logObject.message.concat(argAsString);
    });
    this.transport(logObject);
    return;
  }

  private anythingToString(arg: unknown): string {
    if (typeof arg === 'string') {
      return arg;
    }
    if (arg instanceof Error) {
      return arg.stack || arg.toString();
    }
    return JSON.stringify(arg);
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
}
