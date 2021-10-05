import * as cdk from '@aws-cdk/core';
import { Certificate } from '@aws-cdk/aws-certificatemanager';
import { Alarm } from '@aws-cdk/aws-cloudwatch';
import { Vpc } from '@aws-cdk/aws-ec2';
// import { Repository } from '@aws-cdk/aws-ecr';
import { Cluster, ContainerImage, PropagatedTagSource } from '@aws-cdk/aws-ecs';
import { ApplicationLoadBalancedFargateService } from '@aws-cdk/aws-ecs-patterns';
import { HttpCodeTarget } from '@aws-cdk/aws-elasticloadbalancingv2';
import { HostedZone } from '@aws-cdk/aws-route53';
import { StringParameter } from '@aws-cdk/aws-ssm';

interface MetricsServiceBackendStackProps extends cdk.StackProps {
  domainName: string;
  domainZone: string;
}

export class LunaSecMetricsServerBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: MetricsServiceBackendStackProps) {
    super(scope, id, props);

    // Network infrastructure
    const vpc = new Vpc(this, 'VPC', { maxAzs: 2 });
    const cluster = new Cluster(this, 'Cluster', {
      clusterName: props.domainName.replace(/\./g, '-'),
      vpc,
      containerInsights: true
    });

    // Configuration parameters
    const domainZone = HostedZone.fromLookup(this, 'Zone', { domainName: props.domainZone });
    // const imageRepo = Repository.fromRepositoryName(this, 'Repo', 'reinvent-trivia-backend');
    // const tag = (process.env.IMAGE_TAG) ? process.env.IMAGE_TAG : 'latest';
    const image = ContainerImage.fromAsset('../', {

    });

    // Lookup pre-existing TLS certificate
    const certificateArn = StringParameter.fromStringParameterAttributes(this, 'CertArnParameter', {
      parameterName: 'CertificateArn-' + props.domainName
    }).stringValue;
    const certificate = Certificate.fromCertificateArn(this, 'Cert', certificateArn);

    // Fargate service + load balancer
    const service = new ApplicationLoadBalancedFargateService(this, 'Service', {
      cluster,
      taskImageOptions: {
        image,

      },
      desiredCount: 3,
      domainName: props.domainName,
      domainZone,
      certificate,
      propagateTags: PropagatedTagSource.SERVICE,
    });

    // Alarms: monitor 500s and unhealthy hosts on target groups
    new Alarm(this, 'TargetGroupUnhealthyHosts', {
      alarmName: this.stackName + '-Unhealthy-Hosts',
      metric: service.targetGroup.metricUnhealthyHostCount(),
      threshold: 1,
      evaluationPeriods: 2,
    });

    new Alarm(this, 'TargetGroup5xx', {
      alarmName: this.stackName + '-Http-500',
      metric: service.targetGroup.metricHttpCodeTarget(HttpCodeTarget.TARGET_5XX_COUNT),
      threshold: 1,
      evaluationPeriods: 1,
      period: cdk.Duration.minutes(1)
    });
  }
}
