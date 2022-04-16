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
import { getCallSite } from './callsite';
import { BaseLogObj, LevelChoice, LoggerOptions, LogMethodArgs, LogObj, Transport } from './types';

export * from './types';
export * from './json-transport';

const defaultLoggerFields: BaseLogObj = {
  loggerName: 'default',
};

export class LunaLogger {
  options: LoggerOptions = {};
  baseLogObj: BaseLogObj;
  public transports: Array<Transport> = [];

  constructor(options?: LoggerOptions, additionalFields?: Record<string, unknown>) {
    this.options = options || {};
    this.baseLogObj = { ...defaultLoggerFields, ...additionalFields };
  }

  public addTransport(transport: Transport): void {
    this.transports.push(transport);
  }

  public debug(...args: LogMethodArgs) {
    this.dolog('debug', args);
  }
  public log(...args: LogMethodArgs) {
    this.dolog('info', args);
  }
  public info(...args: LogMethodArgs) {
    this.dolog('info', args);
  }
  public warn(...args: LogMethodArgs) {
    this.dolog('warn', args);
  }
  public error(...args: LogMethodArgs) {
    this.dolog('error', args);
  }

  public child(additionalFields: Record<string, unknown>) {
    const childLogger = new LunaLogger(this.options, { ...this.baseLogObj, ...additionalFields });
    childLogger.transports = this.transports;
    return childLogger;
  }

  public dolog(level: LevelChoice, args: LogMethodArgs): void {
    const now = new Date();
    const logObject: LogObj = {
      level,
      timeEpoch: now.getTime(),
      message: '',
      timePretty: `${now.toDateString()} ${now.toTimeString()}`,
      ...this.baseLogObj,
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

  private isObject(arg: unknown) {
    // sigh..ok javascript, if you say so
    return typeof arg === 'object' && !Array.isArray(arg) && arg !== null;
  }
}
