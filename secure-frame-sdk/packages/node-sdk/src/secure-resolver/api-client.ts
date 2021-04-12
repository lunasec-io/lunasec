import * as http from 'http';
import {getRequestBody} from '../lib/api';
import {FailedApiCallResultMetadata, makeRequest} from '../lib/http';
import {
  SecureResolverActionMessageMap,
  SecureResolverActionResponseMessageMap, SecureResolverApiResponse,
  ValidSecureResolverApiRequestTypes
} from './types';
import {REFINERY_API_SERVER} from './constants';

export interface WrappedSecureResolverApiResponse<T> {
  success: boolean,
  errorMessage?: FailedApiCallResultMetadata,
  responseData?: T
}

export async function makeSecureApiRequest<
  T extends ValidSecureResolverApiRequestTypes,
  TRequest extends SecureResolverActionMessageMap[T]
  >(request: TRequest, path: string, params: http.ClientRequestArgs): Promise<WrappedSecureResolverApiResponse<SecureResolverActionResponseMessageMap[T]>> {
  try {
    // TODO: Add runtime JSON validation for response
    const response = await makeRequest<SecureResolverApiResponse<SecureResolverActionResponseMessageMap[T]>>(REFINERY_API_SERVER, path, params, getRequestBody(request));

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

export type GenericApiClient = <T extends ValidSecureResolverApiRequestTypes>(request: SecureResolverActionMessageMap[T], requestOverrides?: http.ClientRequestArgs) => Promise<WrappedSecureResolverApiResponse<SecureResolverActionResponseMessageMap[T]>>;

export function makeGenericApiClient(path: string, requestBaseConfig: http.ClientRequestArgs): GenericApiClient {
  return async <T extends ValidSecureResolverApiRequestTypes>(request: SecureResolverActionMessageMap[T], requestOverrides?: http.ClientRequestArgs) => {
    const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);

    return await makeSecureApiRequest<T, SecureResolverActionMessageMap[T]>(request, path, requestConfig);
  };
}
