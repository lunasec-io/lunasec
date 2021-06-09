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
