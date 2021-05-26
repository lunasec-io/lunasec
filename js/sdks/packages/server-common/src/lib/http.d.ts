/// <reference types="node" />
import * as http from 'http';
export declare function getUrl(): {
    new (url: string, base?: string | URL | undefined): URL;
    prototype: URL;
    createObjectURL(object: any): string;
    revokeObjectURL(url: string): void;
};
export declare class FailedJsonDeserializationError extends Error {
    readonly rawData?: string;
    constructor(rawData?: string);
}
export declare class BadHttpResponseError extends Error {
    readonly responseCode?: number;
    readonly rawData: string;
    constructor(responseCode: number | undefined, rawData: string);
}
export declare function makeRawRequest(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<readonly [http.IncomingMessage, Buffer]>;
export declare function makeRequest<T>(host: string, path: string, params: http.ClientRequestArgs, body?: string): Promise<T>;
//# sourceMappingURL=http.d.ts.map