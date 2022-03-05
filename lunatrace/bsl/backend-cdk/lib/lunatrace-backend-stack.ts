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
import { ApplicationProtocol, ListenerCondition, SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
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
      cpu: 4096,
      memoryLimitMiB: 8192,
      executionRole: execRole,
    });

    const frontend = taskDef.addContainer('FrontendContainer', {
      cpu: 256,
      memoryLimitMiB: 512,
      image: ContainerImage.fromRegistry('lunasec/lunatrace-frontend:v0.0.3'),
      containerName: 'LunaTraceFrontendContainer',
      portMappings: [{ containerPort: 80 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-frontend',
      }),
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost || exit 1'],
      },
    });

    const oathkeeper = taskDef.addContainer('OathkeeperContainer', {
      containerName: 'OathkeeperContainer',
      cpu: 256,
      memoryLimitMiB: 512,
      image: ContainerImage.fromRegistry('lunasec/lunatrace-ory:v0.0.5'),
      portMappings: [{ containerPort: 4455 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-oathkeeper',
      }),
      command: ['--config', '/config.yaml', 'serve'],
      environment: {
        MUTATORS_ID_TOKEN_CONFIG_JWKS_URL: oryConfigBucket.s3UrlForObject('oathkeeper/jwks.json'),
        ACCESS_RULES_REPOSITORIES: 'file://rules.yaml',
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:4456/health/ready || exit 1'],
      },
    });

    const kratos = taskDef.addContainer('KratosContainer', {
      cpu: 256,
      memoryLimitMiB: 512,
      image: ContainerImage.fromRegistry('lunasec/lunatrace-kratos:v0.0.3'),
      portMappings: [{ containerPort: 4433 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-kratos',
      }),
      command: ['--config', '/config.yaml', 'serve'],
      environment: {
        LOG_LEVEL: 'debug',
      },
      secrets: {
        DSN: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:4434/health/ready || exit 1'],
      },
    });

    const backend = taskDef.addContainer('BackendContainer', {
      cpu: 256,
      memoryLimitMiB: 512,
      image: ContainerImage.fromRegistry('lunasec/lunatrace-backend:v0.0.2'),
      containerName: 'LunaTraceBackendContainer',
      portMappings: [{ containerPort: 8000 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-backend',
      }),
      environment: {
        S3_BUCKET_NAME: bucket.bucketName,
        PORT: '8000',
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:8000/health || exit 1'],
      },
    });

    const hasuraJwtSecretValue = {
      type: 'RS256',
      jwk_url: 'http://localhost:4456/.well-known/jwks.json',
      issuer: 'http://oathkeeper:4455/',
    };

    const hasura = taskDef.addContainer('HasuraContainer', {
      cpu: 256,
      memoryLimitMiB: 512,
      image: ContainerImage.fromRegistry('hasura/graphql-engine:v2.2.0'),
      portMappings: [{ containerPort: 8080 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-hasura',
      }),
      environment: {
        HASURA_GRAPHQL_CORS_DOMAIN: `https://${props.domainName}`,
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
      // healthCheck: {
      //   command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1'],
      // },
    });

    hasura.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    backend.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    frontend.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    kratos.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      vpc: vpc,
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

    loadBalancedFargateService.listener.addTargets('LunaTraceApiTargets', {
      priority: 10,
      conditions: [ListenerCondition.pathPatterns(['/health', '/api/*', '/v1/graphql'])],
      protocol: ApplicationProtocol.HTTP,
      port: 4455,
      targets: [
        loadBalancedFargateService.service.loadBalancerTarget({
          containerPort: 4455,
          containerName: oathkeeper.containerName,
        }),
      ],
      healthCheck: {
        enabled: true,
        path: '/api/health',
        port: '4455',
      },
    });

    loadBalancedFargateService.targetGroup.configureHealthCheck({
      enabled: true,
      path: '/health',
    });

    bucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
    oryConfigBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
  }
}
