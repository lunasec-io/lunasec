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

export interface LunaSecErrorProperties {
  /**  A machine readable name of the error */
  name: string;
  /** A human readable error message, suitable to be displayed to the end user */
  message: string;
  /** An error code, typically corresponding to an HTTP response code */
  code: string;
}

export class LunaSecError extends Error implements LunaSecErrorProperties {
  name: string;
  message: string;
  code: string;

  /**
   * @param e An existing Error object to wrap or an object of new properties to build an error from
   */
  constructor(e: LunaSecErrorProperties | Error) {
    super(e.name);
    this.name = e.name;
    this.message = e.message;
    if ('code' in e) {
      this.code = e.code;
      return;
    }
    this.code = '500';
  }

  toJSON(): LunaSecErrorProperties {
    return { name: this.name, message: this.message, code: this.code };
  }

  toString() {
    return this.message;
  }
}
