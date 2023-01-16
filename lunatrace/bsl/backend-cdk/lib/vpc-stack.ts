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
import { Stack, StackProps } from 'aws-cdk-lib';
import { IVpc, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';
export interface VPCStackProps extends StackProps {
  vpcId?: string;
}

export class VPCStack extends Stack {
  readonly vpc: IVpc;

  constructor(scope: Construct, id: string, props: VPCStackProps) {
    super(scope, id, props);

    if (props.vpcId) {
      this.vpc = Vpc.fromLookup(this, 'lunatrace-vpc', {
        vpcId: props.vpcId,
      });
      return;
    }

    this.vpc = new Vpc(this, 'hasura-vpc', {
      cidr: '10.0.0.0/16',
      enableDnsHostnames: true,
      enableDnsSupport: true,
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'Public',
          subnetType: SubnetType.PUBLIC,
        },
        {
          cidrMask: 24,
          name: 'Database',
          subnetType: SubnetType.PRIVATE_ISOLATED,
        },
      ],
      natGateways: 0,
      maxAzs: 2,
    });
  }
}
