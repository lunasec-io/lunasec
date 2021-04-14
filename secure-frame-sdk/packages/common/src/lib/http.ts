import {URL as URI} from 'url';
import * as http from 'http';
import * as https from 'https';

function getRequestModule(protocol: string) {
  if (protocol === 'http:') {
    return http;
  }

  if (protocol === 'https:') {
    return https;
  }

  throw new Error('Unable to identify request method for Refinery API Client');
}

export class FailedJsonDeserializationError extends Error {
  rawData?: string;

  constructor(rawData?: string) {
    super('Failed to deserialize JSON data');
    this.rawData = rawData;
  }
}

export class BadHttpResponseError extends Error {
  responseCode?: number;
  rawData!: string;

  constructor(responseCode: number | undefined, rawData: string) {
    super('Bad Http response received');
    this.responseCode = responseCode;
    this.rawData = rawData;
  }
}

function getRequestParams(host: string, path: string, params: http.ClientRequestArgs) {
  const requestUri = new URI(path, host);

  const requestModule = getRequestModule(requestUri.protocol);

  const searchParams = requestUri.search !== undefined ? `?${requestUri.search}`: '';

  const requestConfig: http.ClientRequestArgs = {
    protocol: requestUri.protocol,
    hostname: requestUri.hostname,
    port: requestUri.port,
    path: requestUri.pathname + searchParams,
    ...params
  };

  return {requestModule, requestConfig};
}

export function makeRawRequest(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<[http.IncomingMessage, Buffer]> {
  const {requestModule, requestConfig} = getRequestParams(host, path, params);

  return new Promise((resolve, reject) => {

    let responseBuffer: Buffer;
    let req = requestModule.request(requestConfig, res => {
      res.on('data', (chunk: Buffer) => {
        chunk.copy(responseBuffer);
      });
      res.on('end', () => {
        resolve([res, responseBuffer]);
      });
    });

    req.on('error', (e) => reject(e));
    req.on('response', resp => {
      const contentLength = resp.headers['content-length'];

      if (!contentLength) {
        return reject("No content length specified in response")
      }

      const size = parseInt(contentLength);

      if (size < 0) {
        return reject('Content length is negative');
      }

      responseBuffer = Buffer.alloc(size);
    });

    if (body !== undefined) {
      req.write(body);
    }

    req.end();
  });
}

export async function makeRequest<T>(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<T> {
  const [res, responseBuffer] = await makeRawRequest(host, path, params, body);

  const responseData = responseBuffer.toString();

  if (res.statusCode !== 200) {
    throw new BadHttpResponseError(res.statusCode, responseData);
  }

  let outputData: string | undefined;
  try {
    // TODO: Validate this parsed JSON against some schema
    return JSON.parse(responseData) as T;
  } catch (e) {
    console.error(e);

    // If data can't be parsed, wrap the data.
    throw new FailedJsonDeserializationError(outputData);
  }
}

