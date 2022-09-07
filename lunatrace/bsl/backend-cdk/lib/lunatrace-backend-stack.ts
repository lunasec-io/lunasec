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

import { inspect } from 'util';

import { Certificate } from '@aws-cdk/aws-certificatemanager';
import { Port, SecurityGroup, Vpc } from '@aws-cdk/aws-ec2';
import {
  Cluster,
  ContainerDependencyCondition,
  ContainerImage,
  DeploymentControllerType,
  Secret as EcsSecret,
  FargateTaskDefinition,
} from '@aws-cdk/aws-ecs';
import * as ecsPatterns from '@aws-cdk/aws-ecs-patterns';
import { ApplicationProtocol, ListenerCondition, SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
import { ManagedPolicy, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import { HostedZone } from '@aws-cdk/aws-route53';
import { Bucket } from '@aws-cdk/aws-s3';
import { Secret } from '@aws-cdk/aws-secretsmanager';
import { DnsRecordType, PrivateDnsNamespace } from '@aws-cdk/aws-servicediscovery';
import * as cdk from '@aws-cdk/core';
import { Duration } from '@aws-cdk/core';

import { StackInputs } from '../stack-inputs';

import { commonBuildProps } from './constants';
import { addDatadogToTaskDefinition, datadogLogDriverForService } from './datadog-fargate-integration';
import { WorkerStack } from './worker-stack';
import { WorkerStorageStack } from './worker-storage-stack';

type LunaTraceStackProps = cdk.StackProps & StackInputs;

export class LunatraceBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: LunaTraceStackProps) {
    super(scope, id, props);

    const publicBaseUrl = `https://${props.domainName}`;
    const publicHasuraServiceUrl = `${publicBaseUrl}/api/service/v1/graphql`;

    const vpc = Vpc.fromLookup(this, 'Vpc', {
      vpcId: props.vpcId,
    });

    const namespace = new PrivateDnsNamespace(this, 'ServiceDiscoveryNamespace', {
      name: 'services',
      vpc,
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

    const servicesSecurityGroup = new SecurityGroup(this, 'ServicesSecurityGroup', {
      vpc,
      allowAllOutbound: true,
    });

    const oryConfigBucket = Bucket.fromBucketArn(this, 'OryConfig', props.oathkeeperConfigBucketArn);
    const oathkeeperJwksFile = 'lunatrace-oathkeeper.2022-05-13.jwks.json';

    // TODO (cthompson) This is highly annoying. Since we cannot mount files in an ECS container, we need to somehow get
    // the jwks config into oathkeeper. To hack our way into making this happen, we are writing the jwks.json file into
    // an s3 bucket and then referencing that as an s3 url from inside the oathkeeper config.

    // generated with:
    // oathkeeper credentials generate --alg RS256 > jwks.json
    // aws secretsmanager create-secret --name lunatrace-OathkeeperJwks --description "Jwks key details for LunaTrace Oathkeeper" --secret-string '$(cat jwks.json)'
    // const oathkeeperJwksSecret = Secret.fromSecretNameV2(this, 'OathkeeperJwks', 'lunatrace-OathkeeperJwks');

    // new BucketDeployment(this, 'DeployWebsite', {
    //   sources: [Source.asset('../ory/oathkeeper')],
    //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //   // @ts-ignore
    //   destinationBucket: oryConfigBucket,
    // });

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

    const storageStackStage = WorkerStorageStack.createWorkerStorageStack(this, {
      env: props.env,
      publicBaseUrl,
    });

    if (
      !storageStackStage.processRepositorySqsQueue ||
      !storageStackStage.processWebhookSqsQueue ||
      !storageStackStage.processManifestSqsQueue ||
      !storageStackStage.processSbomSqsQueue
    ) {
      throw new Error(`expected non-null storage stack queues: ${inspect(storageStackStage)}`);
    }

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

    addDatadogToTaskDefinition(this, taskDef, props.datadogApiKeyArn);

    const frontendContainerImage = ContainerImage.fromAsset('../frontend', {
      ...commonBuildProps,
    });

    const frontend = taskDef.addContainer('FrontendContainer', {
      image: frontendContainerImage,
      containerName: 'LunaTraceFrontendContainer',
      portMappings: [{ containerPort: 80 }],
      logging: datadogLogDriverForService('lunatrace', 'frontend'),
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost || exit 1'],
      },
    });

    const oathkeeperContainerImage = ContainerImage.fromAsset('../ory/oathkeeper', {
      ...commonBuildProps,
      buildArgs: {
        OATHKEEPER_FRONTEND_URL: 'http://localhost:3000',
        OATHKEEPER_BACKEND_URL: 'http://localhost:3002',
        OATHKEEPER_HASURA_URL: 'http://localhost:8080',
        OATHKEEPER_KRATOS_URL: 'http://localhost:4433',
        OATHKEEPER_MATCH_URL: '<https|http|ws>://<localhost:4455|lunatrace.lunasec.io>',
      },
    });

    const oathkeeper = taskDef.addContainer('OathkeeperContainer', {
      containerName: 'OathkeeperContainer',
      image: oathkeeperContainerImage,
      portMappings: [{ containerPort: 4455 }],
      logging: datadogLogDriverForService('lunatrace', 'oathkeeper'),
      command: ['--config', '/generated/config.yaml', 'serve'],
      environment: {
        MUTATORS_ID_TOKEN_CONFIG_JWKS_URL: oryConfigBucket.s3UrlForObject(oathkeeperJwksFile),
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
    const kratosSlackSecret = Secret.fromSecretCompleteArn(this, 'KratosSlackSecret', props.kratosSlackSecretArn);

    const kratos = taskDef.addContainer('KratosContainer', {
      image: kratosContainerImage,
      portMappings: [{ containerPort: 4433 }],
      logging: datadogLogDriverForService('lunatrace', 'kratos'),
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
        SELFSERVICE_FLOWS_REGISTRATION_AFTER_OIDC_HOOKS_0_CONFIG_URL: EcsSecret.fromSecretsManager(kratosSlackSecret),
      },
      healthCheck: {
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:4434/health/ready || exit 1'],
      },
    });

    const backendContainerImage = ContainerImage.fromAsset('../backend', {
      ...commonBuildProps,
      target: 'backend-express-server',
    });

    const backend = taskDef.addContainer('BackendContainer', {
      image: backendContainerImage,
      containerName: 'LunaTraceBackendContainer',
      portMappings: [{ containerPort: 3002 }],
      logging: datadogLogDriverForService('lunatrace', 'backend'),
      environment: {
        GITHUB_APP_ID: props.gitHubAppId,
        S3_SBOM_BUCKET: storageStackStage.sbomBucket.bucketName,
        S3_MANIFEST_BUCKET: storageStackStage.manifestBucket.bucketName,
        PROCESS_WEBHOOK_QUEUE: storageStackStage.processWebhookSqsQueue.queueName,
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
    storageStackStage.processRepositorySqsQueue.grantSendMessages(backend.taskDefinition.taskRole);

    const hasuraJwksEndpointConfig = {
      type: 'RS256',
      jwk_url: 'http://localhost:4456/.well-known/jwks.json',
      issuer: 'http://oathkeeper:4455/',
    };

    const hasuraContainerImage = ContainerImage.fromAsset('../hasura', {
      ...commonBuildProps,
    });

    const hasura = taskDef.addContainer('HasuraContainer', {
      image: hasuraContainerImage,
      portMappings: [{ containerPort: 8080 }],
      logging: datadogLogDriverForService('lunatrace', 'hasura'),
      environment: {
        HASURA_GRAPHQL_CORS_DOMAIN: `${publicBaseUrl}, http://localhost:9695`,
        HASURA_GRAPHQL_ENABLE_CONSOLE: 'true',
        HASURA_GRAPHQL_PG_CONNECTIONS: '100',
        HASURA_GRAPHQL_LOG_LEVEL: 'debug',
        HASURA_GRAPHQL_JWT_SECRET: JSON.stringify(hasuraJwksEndpointConfig),
        ACTION_BASE_URL: `http://localhost:${backend.containerPort}`,
        REMOTE_SCHEMA_URL: `http://localhost:${backend.containerPort}/graphql/v1`,
      },
      secrets: {
        HASURA_GRAPHQL_METADATA_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_DATABASE_URL: EcsSecret.fromSecretsManager(hasuraDatabaseUrlSecret),
        HASURA_GRAPHQL_ADMIN_SECRET: EcsSecret.fromSecretsManager(hasuraAdminSecret),
      },
      healthCheck: {
        // TODO: Make this verify a 200 status code in the response
        command: ['CMD-SHELL', 'wget --no-verbose --tries=1 --spider http://localhost:8080/healthz || exit 1'],
      },
    });

    backend.addContainerDependencies({
      container: oathkeeper,
      condition: ContainerDependencyCondition.HEALTHY,
    });

    hasura.addContainerDependencies(
      {
        container: oathkeeper,
        condition: ContainerDependencyCondition.HEALTHY,
      },
      {
        container: backend,
        condition: ContainerDependencyCondition.HEALTHY,
      }
    );

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
      securityGroups: [vpcDbSecurityGroup, servicesSecurityGroup],
      circuitBreaker: {
        rollback: true,
      },
      healthCheckGracePeriod: Duration.seconds(5),
      desiredCount: 2,
      deploymentController: {
        type: DeploymentControllerType.ECS,
      },
      cloudMapOptions: {
        name: 'backend',
        cloudMapNamespace: namespace,
        dnsRecordType: DnsRecordType.A,
      },
    });

    loadBalancedFargateService.service.connections.allowFrom(
      servicesSecurityGroup,
      Port.tcp(8080),
      'Allow connections to Hasura from the services security group'
    );

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
    storageStackStage.manifestBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);
    storageStackStage.processWebhookSqsQueue.grantSendMessages(loadBalancedFargateService.taskDefinition.taskRole);
    storageStackStage.processRepositorySqsQueue.grantSendMessages(loadBalancedFargateService.taskDefinition.taskRole);

    oryConfigBucket.grantReadWrite(loadBalancedFargateService.taskDefinition.taskRole);

    WorkerStack.createWorkerStack(this, {
      env: props.env,
      storageStack: storageStackStage,
      fargateCluster,
      fargateService: loadBalancedFargateService,
      gitHubAppId: props.gitHubAppId,
      gitHubAppPrivateKey,
      publicHasuraServiceUrl,
      hasuraDatabaseUrlSecret,
      hasuraAdminSecret,
      backendStaticSecret,
      datadogApiKeyArn: props.datadogApiKeyArn,
      servicesSecurityGroup,
    });
  }
}
