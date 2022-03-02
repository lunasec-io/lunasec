import fs from 'fs';

import sbomS3EventSqsMessageFixture from '../fixtures/upload-manifest-sqs-message.json';
import { handleGenerateSbom } from '../handlers/generateSbom';

describe('manifest handler', () => {
  it('should run', async () => {
    await handleGenerateSbom(sbomS3EventSqsMessageFixture.Records[0]);
    await new Promise(process.nextTick);
    expect(fs.existsSync('./tmp/yarn.lock')).toBe(true);
  });
});
