export declare const TEST_TOKEN = "eb2985fd-1029-4c68-b93d-79a8827e1e08";
export declare const TEST_S3_FILE_PATH = "9ff28";
export declare const TEST_S3_QUERY_PARAMS = "?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=credential&X-Amz-Date=20";
export declare const TEST_S3_HEADERS: {
    GET: {
        host: string;
        'x-amz-server-side-encryption-customer-algorithm': string;
        'x-amz-server-side-encryption-customer-key': string;
        'x-amz-server-side-encryption-customer-key-md5': string;
    };
    PUT: {
        host: string;
        'x-amz-server-side-encryption-customer-algorithm': string;
        'x-amz-server-side-encryption-customer-key': string;
        'x-amz-server-side-encryption-customer-key-md5': string;
    };
};
export declare const TEST_TOKENIZER_SECRET = "a-super-secret-test-secret";
export declare const TEST_PLAINTEXT_VALUE = "some-secret-plaintext-value";
export declare const TEST_METADATA = "{\"foo-key\":true}";
export declare function makeS3Url(port: number): string;
//# sourceMappingURL=test-constants.d.ts.map