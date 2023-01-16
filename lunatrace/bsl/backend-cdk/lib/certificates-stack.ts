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
import { DnsValidatedCertificate } from 'aws-cdk-lib/aws-certificatemanager';
import { PublicHostedZone } from 'aws-cdk-lib/aws-route53';
import { Stack, StackProps } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';

export interface CertificatesStackProps extends StackProps {
  hostedZoneId: string;
  hostedZoneName: string;
  hasuraHostname: string;
  actionsHostname: string;
}

export type Certificates = {
  hasura: DnsValidatedCertificate;
  actions: DnsValidatedCertificate;
};

export class CertificatesStack extends Stack {
  readonly certificates: Certificates;

  constructor(scope: Construct, id: string, props: CertificatesStackProps) {
    super(scope, id, props);

    const hostedZone = PublicHostedZone.fromHostedZoneAttributes(this, 'HasuraHostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.hostedZoneName,
    });

    const hasura = new DnsValidatedCertificate(this, 'HasuraCertificate', {
      hostedZone,
      domainName: props.hasuraHostname,
    });

    const actions = new DnsValidatedCertificate(this, 'ActionsCertificate', {
      hostedZone,
      domainName: props.actionsHostname,
    });

    this.certificates = {
      hasura,
      actions,
    };
  }
}
