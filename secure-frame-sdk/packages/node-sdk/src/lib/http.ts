import {URL as URI} from 'url';
import {REFINERY_API_SERVER} from './constants';
import * as http from 'http';
import * as https from 'https';

function getRequestModule(protocol: string) {
  if (protocol === 'http') {
    return http;
  }

  if (protocol === 'https') {
    return https;
  }

  throw new Error('Unable to identify request method for Refinery API Client');
}

export interface FailedApiCallResultMetadata {
  success: false,
  msg: string
}

export interface FailedJsonDeserializationResult extends FailedApiCallResultMetadata {
  invalidJson: true,
  rawData: string
}

export function makeRequest<T>(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<T> {
  const requestUri = new URI(path, host);

  const requestModule = getRequestModule(requestUri.protocol);

  const requestConfig: http.ClientRequestArgs = {
    ...params,
    ...requestUri
  };

  return new Promise((resolve, reject) => {

    let responseBuffer: string[] = [];
    let req = requestModule.request(requestConfig, res => {
      res.on('data', chunk => responseBuffer.push(chunk));
      res.on('end', () => {
        const outputData = responseBuffer.join('');

        if (res.statusCode !== 200) {
          try {
            return reject(JSON.parse(outputData));
          } catch {
            const errorMetadata: FailedJsonDeserializationResult = {
              success: false,
              msg: 'Invalid JSON data',
              invalidJson: true,
              rawData: outputData
            }

            // If data can't be parsed, wrap the data.
            return reject(errorMetadata);
          }
        }

        resolve(JSON.parse(outputData) as T);
      });
    });

    req.on('error', (e) => reject(e));
    if (body !== undefined) {
      req.write(body);
    }
    req.end();
  });
}

