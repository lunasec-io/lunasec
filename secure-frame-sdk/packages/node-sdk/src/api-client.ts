import * as http from 'http';
import {
  SecureResolverActionMessageMap,
  SecureResolverActionResponseMessageMap,
  SecureResolverApiFailResponse,
  SecureResolverApiSuccessResponse,
  ValidSecureResolverApiRequestTypes
} from './types';
import {REFINERY_API_SERVER} from './constants';
import {
  getRequestBody,
  makeRequest
} from '../../common/src';

export interface SecureEnclaveSuccessApiResponse<T> {
  success: true,
  data: T
}

export interface SecureEnclaveFailApiResponse {
  success: false,
  error: Error
}

export async function makeSecureApiRequest<
  T extends ValidSecureResolverApiRequestTypes,
  TRequest extends SecureResolverActionMessageMap[T]
  >(request: TRequest, path: string, params: http.ClientRequestArgs): Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse> {
  try {
    // TODO: Add runtime JSON validation for response
    const response = await makeRequest<SecureResolverApiSuccessResponse<SecureResolverActionResponseMessageMap[T]> | SecureResolverApiFailResponse>(REFINERY_API_SERVER, path, params, getRequestBody(request));

    if (!response.success) {
      return {
        success: false,
        error: new Error(response.msg !== undefined ? response.msg : 'Malformed response from API with missing error message')
      };
    }

    return {
      success: true,
      data: response.result
    };
  } catch (e) {
    return {
      success: false,
      error: e
    }
  }
}

export type GenericApiClient = <T extends ValidSecureResolverApiRequestTypes>(request: SecureResolverActionMessageMap[T], requestOverrides?: http.ClientRequestArgs) => Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse>;

export function makeGenericApiClient(path: string, requestBaseConfig: http.ClientRequestArgs): GenericApiClient {
  return async <T extends ValidSecureResolverApiRequestTypes>(request: SecureResolverActionMessageMap[T], requestOverrides?: http.ClientRequestArgs) => {
    const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);

    return await makeSecureApiRequest<T, SecureResolverActionMessageMap[T]>(request, path, requestConfig);
  };
}
