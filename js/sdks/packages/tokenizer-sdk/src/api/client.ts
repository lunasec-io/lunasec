import * as http from 'http';
import { TokenizerRequestMessageMap, TokenizerRequestResponseMessageMap, ValidTokenizerApiRequestTypes } from './types';
import { getRequestBody, makeRequest } from '@lunasec/server-common';

export enum TOKENIZER_ERROR_CODES {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export interface TokenizerSuccessApiResponse<T> {
  success: true;
  data: T;
}

export interface TokenizerFailApiResponse {
  success: false;
  error: Error;
  errorCode?: TOKENIZER_ERROR_CODES;
}

export async function makeSecureApiRequest<
  T extends ValidTokenizerApiRequestTypes,
  TRequest extends TokenizerRequestMessageMap[T]
>(
  request: TRequest,
  host: string,
  path: string,
  params: http.ClientRequestArgs
): Promise<TokenizerSuccessApiResponse<TokenizerRequestResponseMessageMap[T]> | TokenizerFailApiResponse> {
  try {
    // TODO: Add runtime JSON validation for response
    const response = await makeRequest<TokenizerRequestResponseMessageMap[T]>(
      host,
      path,
      params,
      getRequestBody(request)
    );

    if (!response) {
      return {
        success: false,
        error: new Error(response !== undefined ? response : 'Malformed response from API with missing error message'),
      };
    }

    return {
      success: true,
      data: response,
    };
  } catch (e) {
    return {
      success: false,
      error: e,
    };
  }
}

export type GenericApiClient = <T extends ValidTokenizerApiRequestTypes>(
  request: TokenizerRequestMessageMap[T],
  requestOverrides?: http.ClientRequestArgs
) => Promise<TokenizerSuccessApiResponse<TokenizerRequestResponseMessageMap[T]> | TokenizerFailApiResponse>;

export function makeGenericApiClient(
  host: string,
  path: string,
  requestBaseConfig: http.ClientRequestArgs
): GenericApiClient {
  return async <T extends ValidTokenizerApiRequestTypes>(
    request: TokenizerRequestMessageMap[T],
    requestOverrides?: http.ClientRequestArgs
  ) => {
    const requestConfig = Object.assign({}, requestBaseConfig, requestOverrides);

    return await makeSecureApiRequest<T, TokenizerRequestMessageMap[T]>(request, host, path, requestConfig);
  };
}

export type SpecificApiClient<T extends ValidTokenizerApiRequestTypes> = (
  request: TokenizerRequestMessageMap[T],
  requestOverrides?: http.ClientRequestArgs
) => Promise<TokenizerSuccessApiResponse<TokenizerRequestResponseMessageMap[T]> | TokenizerFailApiResponse>;

export function makeSpecificApiClient<T extends ValidTokenizerApiRequestTypes>(
  host: string,
  path: string,
  requestBaseConfig: http.ClientRequestArgs
) {
  const genericApiClient = makeGenericApiClient(host, path, requestBaseConfig);

  return async (request: TokenizerRequestMessageMap[T], requestOverrides?: http.ClientRequestArgs) => {
    return await genericApiClient<T>(request, requestOverrides);
  };
}
