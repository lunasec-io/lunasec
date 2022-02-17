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

import { Certificate } from '@aws-cdk/aws-certificatemanager';
import { Port, SecurityGroup, Vpc } from '@aws-cdk/aws-ec2';
import {
  ContainerDependencyCondition,
  ContainerImage,
  Secret as EcsSecret,
  FargateTaskDefinition,
  LogDriver,
} from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
import { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { HostedZone } from '@aws-cdk/aws-route53';
import { Bucket } from '@aws-cdk/aws-s3';
import { BucketDeployment, Source } from '@aws-cdk/aws-s3-deployment';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import * as cdk from '@aws-cdk/core';

interface LunaTraceStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  domainName: string;
  domainZoneId: string;
  appName: string;
  certificateArn: string;
  databaseSecretArn: string;
  vpcId: string;
}

export class LunatraceBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: LunaTraceStackProps) {
    super(scope, id, props);

    // const backendImageAsset = new DockerImageAsset(this, 'LunaTraceBackend', {
    //   directory: path.resolve(path.join(__dirname, '../../backend')),
    //   buildArgs: {},
    //   invalidation: {
    //     buildArgs: false,
    //   },
    // });

    // const cluster = new rds.ServerlessCluster(this, 'RdsServerlessCluster', {
    //   engine: rds.DatabaseClusterEngine.AURORA_POSTGRESQL,
    //   vpc: props.vpc,
    //   vpcSubnets: {
    //     subnetType: SubnetType.PRIVATE_ISOLATED,
    //   },
    //   enableDataApi: true, // Optional - will be automatically set if you call grantDataApiAccess()
    //   parameterGroup: ParameterGroup.fromParameterGroupName(this, 'ParameterGroup', 'default.aurora-postgresql10'),
    // });

    // const cluster = rds.ServerlessCluster.fromServerlessClusterAttributes(this, 'RdsServerlessCluster', {
    //   clusterIdentifier: 'lunatrace-db',
    // });

    // new CfnOutput(this, 'HasuraDatabaseMasterSecretArn', {
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   value: cluster.secret!.secretArn,
    // });
    //
    // const getDbSecretValue = (field: string) => {
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   return cluster.secret!.secretValueFromJson(field).toString();
    // };

    // const secretValue = SecretStringValueBeta1.fromToken(
    //   `postgres://${getDbSecretValue('username')}:${getDbSecretValue('password')}@${getDbSecretValue(
    //     'host'
    //   )}:${getDbSecretValue('port')}/`
    // );

    const vpc = Vpc.fromLookup(this, 'Vpc', {
      vpcId: props.vpcId,
    });

    const dbSecurityGroup = SecurityGroup.fromSecurityGroupId(
      this,
      'DatabaseClusterSecurityGroup',
      'sg-05b9e1c5e5c1b123a'
    );

    const vpcDbSecurityGroup = new SecurityGroup(this, 'sg', {
      vpc: vpc,
      securityGroupName: 'LunaTrace VPC database connection',
    });
    dbSecurityGroup.addIngressRule(vpcDbSecurityGroup, Port.tcp(5432), 'LunaTrace VPC database connection');

    const bucket = new Bucket(this, 'DataBucket');
    const oryConfigBucket = new Bucket(this, 'OryConfig');

    new BucketDeployment(this, 'DeployWebsite', {
      sources: [Source.asset('../ory/')],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      destinationBucket: oryConfigBucket,
    });

    const domainZone = HostedZone.fromHostedZoneAttributes(this, 'HostedZone', {
      hostedZoneId: props.domainZoneId,
      zoneName: props.domainName,
    });

    const certificate = Certificate.fromCertificateArn(this, 'Certificate', props.certificateArn);

    const hasuraDatabaseUrlSecret = Secret.fromSecretCompleteArn(
      this,
      'HasuraDatabaseUrlSecret',
      props.databaseSecretArn
    );

    const hasuraAdminSecret = new Secret(this, 'HasuraAdminSecret', {
      secretName: `${props.appName}-HasuraAdminSecret`,
      generateSecretString: {
        passwordLength: 16,
      },
    });

    const execRole = new Role(this, 'TaskExecutionRole', {
      assumedBy: new ServicePrincipal('ecs-tasks.amazonaws.com'),
    });
    execRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryPowerUser'));

    const taskDef = new FargateTaskDefinition(this, 'TaskDefinition', {
      family: 'LunaTraceAppTaskDefinition',
      executionRole: execRole,
    });

    const oathkeeper = taskDef.addContainer('OathkeeperContainer', {
      image: ContainerImage.fromRegistry('lunasec/lunatrace-ory:v0.0.4'),
      portMappings: [{ containerPort: 4455 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-oathkeeper',
      }),
      command: ['--config', '/config.yaml', 'serve'],
      environment: {
        SERVE_PROXY_PORT: '4455',
        MUTATORS_ID_TOKEN_CONFIG_ISSUER_URL: 'http://oathkeeper/',
        ACCESS_RULES_REPOSITORIES: oryConfigBucket.s3UrlForObject('oathkeeper/rules.yaml'),
        MUTATORS_ID_TOKEN_CONFIG_JWKS_URL: oryConfigBucket.s3UrlForObject('oathkeeper/jwks.json'),
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:4456/health/alive || exit 1'],
      },
    });

    const backend = taskDef.addContainer('BackendContainer', {
      image: ContainerImage.fromRegistry('lunasec/lunatrace-backend:v0.0.1'),
      containerName: 'LunaTraceBackendContainer',
      portMappings: [{ containerPort: 8000 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-backend',
      }),
      environment: {
        S3_BUCKET_NAME: bucket.bucketName,
        PORT: '8000',
      },
    });

    const hasuraJwtSecretValue = {
      type: 'RS256',
      jwk_url: 'http://localhost:4456/.well-known/jwks.json',
      issuer: 'http://oathkeeper:4455/',
    };

    const hasura = taskDef.addContainer('HasuraContainer', {
      image: ContainerImage.fromRegistry('hasura/graphql-engine:v2.2.0'),
      portMappings: [{ containerPort: 8080 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-hasura',
      }),
      environment: {
        HASURA_GRAPHQL_ENABLE_CONSOLE: 'true',
        HASURA_GRAPHQL_PG_CONNECTIONS: '100',
        HASURA_GRAPHQL_LOG_LEVEL: 'debug',
        HASURA_GRAPHQL_JWT_SECRET: JSON.stringify(hasuraJwtSecretValue),
      },
      secrets: {
        HASURA_GRAPHQL_METADATA_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
      },
    });

    hasura.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    backend.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      vpc: vpc,
      cpu: 1024,
      certificate,
      domainZone,
      publicLoadBalancer: true,
      assignPublicIp: true,
      redirectHTTP: true,
      sslPolicy: SslPolicy.RECOMMENDED,
      domainName: props.domainName,
      taskDefinition: taskDef,
      securityGroups: [vpcDbSecurityGroup],
    });

    loadBalancedFargateService.targetGroup.healthCheck = {
      enabled: true,
      path: '/health',
    };

    bucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
    oryConfigBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
  }
}
