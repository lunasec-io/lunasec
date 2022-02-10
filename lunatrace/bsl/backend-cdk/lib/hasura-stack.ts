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
import { InstanceClass, InstanceSize, InstanceType, IVpc, Port, Protocol, SubnetType, Vpc } from '@aws-cdk/aws-ec2';
import { ContainerImage, Secret as ECSSecret } from '@aws-cdk/aws-ecs';
import { ApplicationLoadBalancedFargateService } from '@aws-cdk/aws-ecs-patterns';
import { DatabaseInstance, DatabaseInstanceEngine, DatabaseSecret } from '@aws-cdk/aws-rds';
import { PublicHostedZone } from '@aws-cdk/aws-route53';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import { CfnOutput, Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

import { Certificates } from './certificates-stack';

export interface HasuraStackProps extends StackProps {
  appName: string;
  hostedZoneId: string;
  hostedZoneName: string;
  hasuraHostname: string;
  certificates: Certificates;
  vpc: IVpc;
  multiAz: boolean;
}

export class HasuraStack extends Stack {
  constructor(scope: Construct, id: string, props: HasuraStackProps) {
    super(scope, id, props);

    const hostedZone = PublicHostedZone.fromHostedZoneAttributes(this, 'HasuraHostedZone', {
      hostedZoneId: props.hostedZoneId,
      zoneName: props.hostedZoneName,
    });

    const hasuraDatabaseName = props.appName;

    const hasuraDatabase = new DatabaseInstance(this, 'HasuraDatabase', {
      instanceIdentifier: props.appName,
      databaseName: hasuraDatabaseName,
      engine: DatabaseInstanceEngine.POSTGRES,
      instanceType: InstanceType.of(InstanceClass.BURSTABLE3, InstanceSize.MICRO),
      masterUsername: 'syscdk',
      storageEncrypted: true,
      allocatedStorage: 20,
      maxAllocatedStorage: 100,
      vpc: props.vpc,
      deletionProtection: false,
      multiAz: props.multiAz,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    const hasuraUsername = 'hasura';

    const hasuraUserSecret = new DatabaseSecret(this, 'HasuraDatabaseUser', {
      username: hasuraUsername,
      masterSecret: hasuraDatabase.secret,
    });
    hasuraUserSecret.attach(hasuraDatabase); // Adds DB connections information in the secret

    // Output the Endpoint Address so it can be used in post-deploy
    new CfnOutput(this, 'HasuraDatabaseUserSecretArn', {
      value: hasuraUserSecret.secretArn,
    });

    new CfnOutput(this, 'HasuraDatabaseMasterSecretArn', {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      value: hasuraDatabase.secret!.secretArn,
    });

    const hasuraDatabaseUrlSecret = new Secret(this, 'HasuraDatabaseUrlSecret', {
      secretName: `${props.appName}-HasuraDatabaseUrl`,
    });

    new CfnOutput(this, 'HasuraDatabaseUrlSecretArn', {
      value: hasuraDatabaseUrlSecret.secretArn,
    });

    const hasuraAdminSecret = new Secret(this, 'HasuraAdminSecret', {
      secretName: `${props.appName}-HasuraAdminSecret`,
    });

    new CfnOutput(this, 'HasuraAdminSecretArn', {
      value: hasuraAdminSecret.secretArn,
    });

    const hasuraJwtSecret = new Secret(this, 'HasuraJwtSecret', {
      secretName: `${props.appName}-HasuraJWTSecret`,
    });

    new CfnOutput(this, 'HasuraJwtSecretArn', {
      value: hasuraJwtSecret.secretArn,
    });

    // Create a load-balanced Fargate service and make it public
    const fargate = new ApplicationLoadBalancedFargateService(this, 'HasuraFargateService', {
      serviceName: props.appName,
      vpc: props.vpc,
      cpu: 256,
      desiredCount: props.multiAz ? 2 : 1,
      taskImageOptions: {
        image: ContainerImage.fromRegistry('hasura/graphql-engine:v1.2.1'),
        containerPort: 8080,
        enableLogging: true,
        environment: {
          HASURA_GRAPHQL_ENABLE_CONSOLE: 'true',
          HASURA_GRAPHQL_PG_CONNECTIONS: '100',
          HASURA_GRAPHQL_LOG_LEVEL: 'debug',
        },
        secrets: {
          HASURA_GRAPHQL_DATABASE_URL: ECSSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
          HASURA_GRAPHQL_ADMIN_SECRET: ECSSecret.fromSecretsManager(hasuraAdminSecret),
          HASURA_GRAPHQL_JWT_SECRET: ECSSecret.fromSecretsManager(hasuraJwtSecret),
        },
      },
      memoryLimitMiB: 512,
      publicLoadBalancer: true, // Default is false
      certificate: props.certificates.hasura,
      domainName: props.hasuraHostname,
      domainZone: hostedZone,
      assignPublicIp: true,
    });

    fargate.targetGroup.configureHealthCheck({
      enabled: true,
      path: '/healthz',
      healthyHttpCodes: '200',
    });

    hasuraDatabase.connections.allowFrom(
      fargate.service,
      new Port({
        protocol: Protocol.TCP,
        stringRepresentation: 'Postgres Port',
        fromPort: 5432,
        toPort: 5432,
      })
    );
  }
}
