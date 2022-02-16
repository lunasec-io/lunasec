/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { FollowMode } from '@aws-cdk/assets';
import { AssetCode, CfnLayerVersion, LayerVersion, LayerVersionProps, Runtime } from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export interface LambdaLayerProps {
  readonly contentLocation: string;
  readonly compatibleRuntimes?: Runtime[];
  readonly description?: string;
  readonly license?: string;
}

export class RetainedLambdaLayerVersion extends LayerVersion {
  constructor(scope: cdk.Construct, id: string, props: LambdaLayerProps) {
    const lambdaVersionProps: LayerVersionProps = {
      description: props.description,
      compatibleRuntimes: props.compatibleRuntimes,
      code: new AssetCode(props.contentLocation, { follow: FollowMode.ALWAYS }),
      license: props.license,
    };

    super(scope, id, lambdaVersionProps);

    const layerVersion = this.node.findChild('Resource') as CfnLayerVersion;
    layerVersion.addOverride('UpdateReplacePolicy', 'Retain'); // retain old layer versions (see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-updatereplacepolicy.html & https://www.reddit.com/r/aws/comments/amecr5/cloudformation_awslambdalayerversion_how_to/)
  }
}
