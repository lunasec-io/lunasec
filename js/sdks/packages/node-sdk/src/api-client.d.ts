/// <reference types="node" />
import * as http from 'http';
import { SecureResolverActionMessageMap, SecureResolverActionResponseMessageMap, ValidSecureResolverApiRequestTypes } from './types';
export interface SecureEnclaveSuccessApiResponse<T> {
    success: true;
    data: T;
}
export interface SecureEnclaveFailApiResponse {
    success: false;
    error: Error;
}
export declare function makeSecureApiRequest<T extends ValidSecureResolverApiRequestTypes, TRequest extends SecureResolverActionMessageMap[T]>(request: TRequest, path: string, params: http.ClientRequestArgs): Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse>;
export declare type GenericApiClient = <T extends ValidSecureResolverApiRequestTypes>(request: SecureResolverActionMessageMap[T], requestOverrides?: http.ClientRequestArgs) => Promise<SecureEnclaveSuccessApiResponse<SecureResolverActionResponseMessageMap[T]> | SecureEnclaveFailApiResponse>;
export declare function makeGenericApiClient(path: string, requestBaseConfig: http.ClientRequestArgs): GenericApiClient;
//# sourceMappingURL=api-client.d.ts.map