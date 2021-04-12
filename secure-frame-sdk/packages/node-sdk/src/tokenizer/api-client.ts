import * as http from 'http';
import {
  TokenizerRequestMessageMap, TokenizerRequestResponseMessageMap,
  ValidTokenizerApiRequestTypes
} from './types';
import {FailedApiCallResultMetadata, makeRequest} from '../lib/http';
import {getRequestBody} from '../lib/api';

export interface WrappedTokenizerApiResponse<T> {
  success: boolean,
  errorMessage?: FailedApiCallResultMetadata,
  responseData?: T
}

export async function makeSecureApiRequest<
  T extends ValidTokenizerApiRequestTypes,
  TRequest extends TokenizerRequestMessageMap[T]
  >(request: TRequest, host: string, path: string, params: http.ClientRequestArgs): Promise<WrappedTokenizerApiResponse<TokenizerRequestResponseMessageMap[T]>> {

  try {
    // TODO: Add runtime JSON validation for response
    const response =  await makeRequest<TokenizerRequestResponseMessageMap[T]>(host, path, params, getRequestBody(request));

    if (!response) {
      return {
        success: false,
        errorMessage: {
          success: false,
          msg: response !== undefined ? response : 'Malformed response from API with missing error message'
        }
      };
    }

    return {
      success: true,
      responseData: response
    };
  } catch (e) {
    return {
      success: false,
      errorMessage: e
    }
  }
}

export type GenericApiClient = <T extends ValidTokenizerApiRequestTypes>(request: TokenizerRequestMessageMap[T], requestOverrides?: http.ClientRequestArgs) => Promise<WrappedTokenizerApiResponse<TokenizerRequestResponseMessageMap[T]>>;

export function makeGenericApiClient(host: string, path: string, requestBaseConfig: http.ClientRequestArgs): GenericApiClient {
  return async <T extends ValidTokenizerApiRequestTypes>(request: TokenizerRequestMessageMap[T], requestOverrides?: http.ClientRequestArgs) => {
    const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);

    return await makeSecureApiRequest<T, TokenizerRequestMessageMap[T]>(request, host, path, requestConfig);
  };
}

export type SpecificApiClient<T extends ValidTokenizerApiRequestTypes> = (request: TokenizerRequestMessageMap[T], requestOverrides?: http.ClientRequestArgs) => Promise<WrappedTokenizerApiResponse<TokenizerRequestResponseMessageMap[T]>>;

export function makeSpecificApiClient<T extends ValidTokenizerApiRequestTypes>(host: string, path: string, requestBaseConfig: http.ClientRequestArgs) {
  const genericApiClient = makeGenericApiClient(host, path, requestBaseConfig);

  return async (request: TokenizerRequestMessageMap[T], requestOverrides?: http.ClientRequestArgs) => {
    return await genericApiClient<T>(request, requestOverrides);
  };
}
