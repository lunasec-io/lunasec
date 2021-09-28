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

import { getRequestBody, makeRequest } from '@lunasec/server-common';

import {
  SecureResolverActionMessageMap,
  SecureResolverActionResponseMessageMap,
  SecureResolverApiFailResponse,
  SecureResolverApiSuccessResponse,
  ValidSecureResolverApiRequestTypes,
} from './types';

export interface SecureEnclaveSuccessApiResponse<T> {
  success: true;
  data: T;
}

export interface SecureEnclaveFailApiResponse {
  success: false;
  error: Error;
}

export async function makeSecureApiRequest<
  T extends ValidSecureResolverApiRequestTypes,
  TRequest extends SecureResolverActionMessageMap[T]
>(
  host: string,
  request: TRequest,
  path: string,
  params: http.ClientRequestArgs
): Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse> {
  try {
    // TODO: Add runtime JSON validation for response
    const response = await makeRequest<
      SecureResolverApiSuccessResponse<SecureResolverActionResponseMessageMap[T]> | SecureResolverApiFailResponse
    >(host, path, params, getRequestBody(request));

    if (!response.success) {
      return {
        success: false,
        error: new Error(
          response.msg !== undefined ? response.msg : 'Malformed response from API with missing error message'
        ),
      };
    }

    return {
      success: true,
      data: response.result,
    };
  } catch (e) {
    return {
      success: false,
      error: e as Error,
    };
  }
}

export type GenericApiClient = <T extends ValidSecureResolverApiRequestTypes>(
  request: SecureResolverActionMessageMap[T],
  requestOverrides?: http.ClientRequestArgs
) => Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse>;

export function makeGenericApiClient(
  host: string,
  path: string,
  requestBaseConfig: http.ClientRequestArgs
): GenericApiClient {
  return async <T extends ValidSecureResolverApiRequestTypes>(
    request: SecureResolverActionMessageMap[T],
    requestOverrides?: http.ClientRequestArgs
  ) => {
    const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);

    return await makeSecureApiRequest<T, SecureResolverActionMessageMap[T]>(host, request, path, requestConfig);
  };
}
