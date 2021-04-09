import * as http from 'http';
import {
  SecureResolverActionMessageMap,
  SecureResolverActionResponseMessageMap,
  SecureResolverApiResponse,
  ValidApiRequestTypes
} from '@esluna/common';
import {
  FailedApiCallResultMetadata,
  makeRequest
} from './http';

export interface WrappedApiResponse<T> {
  success: boolean,
  errorMessage?: FailedApiCallResultMetadata,
  responseData?: T
}

function getRequestBody<T>(request: T) {
  if (request === undefined || request === null) {
    return undefined;
  }

  return JSON.stringify(request);
}

export async function makeSecureApiRequest<
  T extends ValidApiRequestTypes,
  TRequest extends SecureResolverActionMessageMap[T]
  >(request: TRequest, path: string, params: http.ClientRequestArgs): Promise<WrappedApiResponse<SecureResolverActionResponseMessageMap[T]>> {

  try {
    // TODO: Add runtime JSON validation for response
    const response = await makeRequest<SecureResolverApiResponse<SecureResolverActionResponseMessageMap[T]>>(path, params, getRequestBody(request));

    if (!response.success) {
      return {
        success: false,
        errorMessage: {
          success: false,
          msg: response.msg !== undefined ? response.msg : 'Malformed response from API with missing error message'
        }
      };
    }

    return {
      success: true,
      responseData: response.result
    };
  } catch (e) {
    return {
      success: false,
      errorMessage: e
    }
  }
}

export type GenericApiClient = <T extends ValidApiRequestTypes>(request: SecureResolverActionMessageMap[T]) => Promise<WrappedApiResponse<SecureResolverActionResponseMessageMap[T]>>;

export function makeGenericApiClient(path: string, requestConfig: http.ClientRequestArgs): GenericApiClient {
  return async <T extends ValidApiRequestTypes>(request: SecureResolverActionMessageMap[T]) => {
    return await makeSecureApiRequest<T, SecureResolverActionMessageMap[T]>(request, path, requestConfig);
  };
}
