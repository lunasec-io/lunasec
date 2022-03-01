import fs from 'fs';
import path from 'path';
import util from 'util';

import { fetchSetManifestStatus } from '../hasura-calls/updateManifestStatus';
import { SqsMessage } from '../types/SqsMessage';
import { aws } from '../utils/aws-utils';
const writeFilePromise = util.promisify(fs.writeFile);
export async function handleGenerateSbom(message: SqsMessage) {
  const region = message.awsRegion;
  const bucket = message.s3.bucket.name;
  const key = message.s3.object.key;
  try {
    const hasuraRes = await fetchSetManifestStatus(key, 'processing');

    console.log('filename is  ', hasuraRes);
    const fileBuffer = await aws.getFileFromS3(key, bucket);
    const fileString = await aws.streamToString(fileBuffer);
    //todo: possible security issue with taking filename from client and writing it to disk
    const filePath = path.resolve(`./tmp/${hasuraRes.filename}`);
    fs.writeFileSync(filePath, fileString);
    console.log('done writing file ', filePath);
  } catch (e) {
    if (e instanceof Error) {
      console.error(e);
      // last ditch attempt to write an error to show in the UX..may or may not work depending on what the issue is
      await fetchSetManifestStatus(key, 'error', e.message);
    }
  }
}
