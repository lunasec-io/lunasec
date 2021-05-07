export const TEST_TOKEN = 'eb2985fd-1029-4c68-b93d-79a8827e1e08';
export const TEST_S3_FILE_PATH = '9ff28';
export const TEST_S3_QUERY_PARAMS = '?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=credential&X-Amz-Date=20';
export const TEST_S3_HEADERS = {
  GET: {
    host: 'localhost',
    'x-amz-server-side-encryption-customer-algorithm': 'AES256',
    'x-amz-server-side-encryption-customer-key': 'asdfasdf',
    'x-amz-server-side-encryption-customer-key-md5': '1qGJ/Ygpg077QbftogbaqQ==',
  },
  PUT: {
    host: 'localhost',
    'x-amz-server-side-encryption-customer-algorithm': 'AES256',
    'x-amz-server-side-encryption-customer-key': 'asdfasdf',
    'x-amz-server-side-encryption-customer-key-md5': '1qGJ/Ygpg077QbftogbaqQ==',
  },
};
export const TEST_TOKENIZER_SECRET = 'a-super-secret-test-secret';
export const TEST_PLAINTEXT_VALUE = 'some-secret-plaintext-value';
export const TEST_METADATA = '{"foo-key":true}';

export function makeS3Url(port: number) {
  return `http://localhost:${port}/${TEST_S3_FILE_PATH}${TEST_S3_QUERY_PARAMS}`;
}
