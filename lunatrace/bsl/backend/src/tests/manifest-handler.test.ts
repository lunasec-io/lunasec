import fs from 'fs';

import sbomS3EventSqsMessageFixture from '../fixtures/upload-manifest-sqs-message.json';
import { handleGenerateSbom } from '../handlers/generateSbom';
import { S3ObjectMetadata } from '../types/s3';

const objectMetadata: S3ObjectMetadata = {
  key: 'c4fabcc6-9c72-48b5-bf98-e22df5f73e05/2022/1/1/18/4c564207-45dc-4615-bff4-966b4eac63c4',
  bucketName: 'test-manifest-bucket-one',
  region: 'us-west-2',
};

jest.setTimeout(30000);

describe('manifest handler', () => {
  it('should run', async () => {
    await handleGenerateSbom(objectMetadata);
  });
});
