/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';
import * as s3 from '@aws-cdk/aws-s3';
// import * as s3deployment from '@aws-cdk/aws-s3-deployment';
import * as cdk from '@aws-cdk/core';

import { LunaSecStackResource } from './types';

export class TokenizerBackendBucket extends s3.Bucket {
  constructor(scope: cdk.Construct, name: LunaSecStackResource) {
    const props: s3.BucketProps = {
      publicReadAccess: true,
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'index.html',
    };
    super(scope, name, props);
  }
}

export class TokenizerBackendCloudfront extends cloudfront.Distribution {
  constructor(scope: cdk.Construct, bucket: s3.Bucket) {
    // TODO (cthompson) there is a bug in the aws cdk code for this
    // The lambda function that is used to do the unzipping and pushing to the
    // s3 bucket has its "code" attribute set to an empty zip s3 object
    // To fix this problem we will need to debug why this line of code
    // is resulting in an empty zip: https://github.com/aws/aws-cdk/blob/master/packages/%40aws-cdk/aws-s3-deployment/lib/bucket-deployment.ts#L279

    // new s3deployment.BucketDeployment(scope, 'tokenizer-backend-deployment', {
    //   sources: [s3deployment.Source.asset(asset)],
    //   destinationBucket: bucket,
    // });

    const name = 'tokenizer-backend-cloudfront';

    super(scope, name, {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
      },
    });
  }
}
