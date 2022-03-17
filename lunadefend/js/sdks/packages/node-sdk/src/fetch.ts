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
import * as http from 'http';

export enum FetchErrorType {
  Timeout = 'Timeout',
  Unknown = 'Unknown',
}

export interface FetchFailureResponse {
  success: false;
  error: Error;
  errorType: FetchErrorType;
}

export interface FetchSuccessResponse {
  success: true;
  body: string;
  response: http.IncomingMessage;
}

export async function fetch(
  requestOptions: http.RequestOptions,
  body?: string
): Promise<FetchFailureResponse | FetchSuccessResponse> {
  return new Promise((resolve) => {
    const request = http.request({ timeout: 30000, ...requestOptions }, (res) => {
      const body: Array<Uint8Array> = [];

      res.on('data', (chunk) => body.push(chunk));

      res.on('end', () => {
        const resString = Buffer.concat(body).toString();
        resolve({
          success: true,
          body: resString,
          response: res,
        });
      });
    });

    request.on('error', (err) => {
      resolve({
        success: false,
        error: err,
        errorType: FetchErrorType.Unknown,
      });
    });

    request.on('timeout', () => {
      request.destroy();
      resolve({
        success: false,
        error: new Error('Timed out while making fetch request'),
        errorType: FetchErrorType.Timeout,
      });
    });

    if (body !== undefined) {
      request.write(body);
      request.end();
    }
  });
}
