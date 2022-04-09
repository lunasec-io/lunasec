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
  Cluster,
  ContainerDependencyCondition,
  ContainerImage,
  DeploymentControllerType,
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
import { Queue } from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';

import { commonBuildProps } from './constants';
import { EtlStack } from './etl-stack';
import { EtlStorageStack, EtlStorageStackState } from './etl-storage-stack';

interface LunaTraceStackProps extends cdk.StackProps {
  // TODO: Make the output URL be a URL managed by us, not AWS
  domainName: string;
  domainZoneId: string;
  appName: string;
  certificateArn: string;
  backendStaticSecretArn: string;
  databaseSecretArn: string;
  gitHubAppId: string;
  gitHubAppPrivateKey: string;
  gitHubAppWebHookSecret: string;
  githubOauthAppLoginSecretArn: string;
  githubOauthAppLoginClientIdArn: string;
  kratosCookieSecretArn: string;
  kratosCipherSecretArn: string;
  vpcId: string;
}

export class LunatraceBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: LunaTraceStackProps) {
    super(scope, id, props);

    const publicBaseUrl = `https://${props.domainName}`;
    const publicHasuraServiceUrl = `${publicBaseUrl}/api/service/v1/graphql`;

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

    const backendStaticSecret = Secret.fromSecretCompleteArn(this, 'BackendStaticSecret', props.backendStaticSecretArn);
    const gitHubAppPrivateKey = Secret.fromSecretCompleteArn(this, 'GitHubAppPrivateKey', props.gitHubAppPrivateKey);
    const gitHubAppWebHookSecret = Secret.fromSecretCompleteArn(
      this,
      'GitHubAppWebHookSecret',
      props.gitHubAppWebHookSecret
    );

    const storageStackStage = EtlStorageStack.createEtlStorageStack(this, {
      env: props.env,
      publicBaseUrl,
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

    const frontendContainerImage = ContainerImage.fromAsset('../', {
      ...commonBuildProps,
      file: './frontend/Dockerfile',
    });

    const frontend = taskDef.addContainer('FrontendContainer', {
      image: frontendContainerImage,
      containerName: 'LunaTraceFrontendContainer',
      portMappings: [{ containerPort: 80 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-frontend',
      }),
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost || exit 1'],
      },
    });

    const oathkeeperContainerImage = ContainerImage.fromAsset('../ory/oathkeeper', commonBuildProps);

    const oathkeeper = taskDef.addContainer('OathkeeperContainer', {
      containerName: 'OathkeeperContainer',
      image: oathkeeperContainerImage,
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

    const kratosContainerImage = ContainerImage.fromAsset('../ory/kratos', commonBuildProps);

    const githubOauthAppLoginClientId = Secret.fromSecretCompleteArn(
      this,
      'GithubOauthAppLoginClientId',
      props.githubOauthAppLoginClientIdArn
    );
    const githubOauthAppLoginSecret = Secret.fromSecretCompleteArn(
      this,
      'GithubOauthAppLoginSecret',
      props.githubOauthAppLoginSecretArn
    );

    const kratosCookieSecret = Secret.fromSecretCompleteArn(this, 'KratosCookieSecret', props.kratosCookieSecretArn);
    const kratosCipherSecret = Secret.fromSecretCompleteArn(this, 'KratosCipherSecret', props.kratosCipherSecretArn);

    const kratos = taskDef.addContainer('KratosContainer', {
      image: kratosContainerImage,
      portMappings: [{ containerPort: 4433 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-kratos',
      }),
      command: ['--config', '/config/config.yaml', '--config', '/config/config.production.yaml', 'serve'],
      environment: {
        // Set this to 'trace' if you need more data
        LOG_LEVEL: 'debug',
      },
      secrets: {
        DSN: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        SELFSERVICE_METHODS_OIDC_CONFIG_PROVIDERS_0_CLIENT_ID:
          EcsSecret.fromSecretsManager(githubOauthAppLoginClientId),
        SELFSERVICE_METHODS_OIDC_CONFIG_PROVIDERS_0_CLIENT_SECRET:
          EcsSecret.fromSecretsManager(githubOauthAppLoginSecret),
        SECRETS_COOKIE: EcsSecret.fromSecretsManager(kratosCookieSecret),
        SECRETS_CIPHER: EcsSecret.fromSecretsManager(kratosCipherSecret),
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:4434/health/ready || exit 1'],
      },
    });

    const backendContainerImage = ContainerImage.fromAsset('../', {
      ...commonBuildProps,
      file: './backend/Dockerfile',
      target: 'backend-express-server',
    });

    const backend = taskDef.addContainer('BackendContainer', {
      image: backendContainerImage,
      containerName: 'LunaTraceBackendContainer',
      portMappings: [{ containerPort: 3002 }],
      logging: LogDriver.awsLogs({
        streamPrefix: 'lunatrace-backend',
      }),
      environment: {
        GITHUB_APP_ID: props.gitHubAppId,
        S3_SBOM_BUCKET: storageStackStage.sbomBucket.bucketName,
        S3_MANIFEST_BUCKET: storageStackStage.manifestBucket.bucketName,
        SITE_PUBLIC_URL: publicBaseUrl,
        PORT: '3002',
        NODE_ENV: 'production',
      },
      secrets: {
        DATABASE_CONNECTION_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        STATIC_SECRET_ACCESS_TOKEN: EcsSecret.fromSecretsManager(backendStaticSecret),
        GITHUB_APP_PRIVATE_KEY: EcsSecret.fromSecretsManager(gitHubAppPrivateKey),
        GITHUB_APP_WEBHOOK_SECRET: EcsSecret.fromSecretsManager(gitHubAppWebHookSecret),
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:3002/health || exit 1'],
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
        HASURA_GRAPHQL_CORS_DOMAIN: `${publicBaseUrl}, http://localhost:9695`,
        HASURA_GRAPHQL_ENABLE_CONSOLE: 'true',
        HASURA_GRAPHQL_PG_CONNECTIONS: '100',
        HASURA_GRAPHQL_LOG_LEVEL: 'debug',
        HASURA_GRAPHQL_JWT_SECRET: JSON.stringify(hasuraJwtSecretValue),
        ACTION_BASE_URL: `http://localhost:${backend.containerPort}`,
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

    const fargateCluster = new Cluster(this, 'LunaTraceFargateCluster', {
      vpc,
      enableFargateCapacityProviders: true,
    });

    const loadBalancedFargateService = new ecsPatterns.ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster: fargateCluster,
      certificate,
      domainZone,
      publicLoadBalancer: true,
      assignPublicIp: true,
      redirectHTTP: true,
      sslPolicy: SslPolicy.RECOMMENDED,
      domainName: props.domainName,
      taskDefinition: taskDef,
      securityGroups: [vpcDbSecurityGroup],
      circuitBreaker: {
        rollback: true,
      },
      deploymentController: {
        // This sets up Blue/Green deploys
        type: DeploymentControllerType.CODE_DEPLOY,
      },
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

    storageStackStage.sbomBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
    oryConfigBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
    storageStackStage.manifestBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);

    EtlStack.createEtlStack(this, {
      env: props.env,
      storageStack: storageStackStage,
      fargateCluster,
      gitHubAppId: props.gitHubAppId,
      gitHubAppPrivateKey,
      publicHasuraServiceUrl,
      hasuraDatabaseUrlSecret,
      hasuraAdminSecret,
      backendStaticSecret,
    });
  }
}
