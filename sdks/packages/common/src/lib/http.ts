import * as http from 'http';
import * as https from 'https';

// Apparently this is automatically imported in both Node and the Browser.
// It's kind of janky to _not_ explicitly import this, but this is the best "isomorphic" way.
// If we do import it, then the Browser webpack build step complains.
// If we do this, then both Node.js and the browser seem to work. *shrug*
export function getUrl() {
  // @ts-ignore
  return URL;
}

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
  readonly rawData?: string;

  constructor(rawData?: string) {
    super('Failed to deserialize JSON data');
    this.rawData = rawData;
  }
}

export class BadHttpResponseError extends Error {
  readonly responseCode?: number;
  readonly rawData!: string;

  constructor(responseCode: number | undefined, rawData: string) {
    super('Bad Http response received');
    this.responseCode = responseCode;
    this.rawData = rawData;
  }
}

function getRequestParams(host: string, path: string, params: http.ClientRequestArgs) {
  const URL = getUrl();

  const requestUri = new URL(path, host);

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

export function makeRawRequest(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<readonly [http.IncomingMessage, Buffer]> {
  const {requestModule, requestConfig} = getRequestParams(host, path, params);

  return new Promise((resolve, reject) => {

    let responseBuffer: Buffer;
    const req = requestModule.request(requestConfig, res => {
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
        responseBuffer = Buffer.alloc(0);
        return;
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
    console.log('bad response', {host, path, params, res, responseData});
    throw new BadHttpResponseError(res.statusCode, responseData);
  }

  try {
    // TODO: Validate this parsed JSON against some schema
    return JSON.parse(responseData) as T;
  } catch (e) {
    // If data can't be parsed, wrap the data.
    const error = new FailedJsonDeserializationError(responseData);
    console.error(error);
    throw error;
  }
}

