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
import * as ecr from '@aws-cdk/aws-ecr';
import * as events from '@aws-cdk/aws-events';
import * as eventstargets from '@aws-cdk/aws-events-targets';
import * as iam from '@aws-cdk/aws-iam';
import * as lambda from '@aws-cdk/aws-lambda';
import * as cdk from '@aws-cdk/core';

export class AnalyticsCollectorLambda extends lambda.DockerImageFunction {
  constructor(scope: cdk.Construct, versionTag: string) {
    const tokenizerBcakendRepo = ecr.Repository.fromRepositoryName(
      scope,
      'analytics-collector-repo',
      'analytics-collector'
    );
    const baseProps: lambda.DockerImageFunctionProps = {
      code: lambda.DockerImageCode.fromEcr(tokenizerBcakendRepo, {
        tag: versionTag,
      }),
      environment: {
        STACK_ID: scope.node.id,
      },
    };
    super(scope, 'analytics-collector-lambda', baseProps);

    // allow the analytics collector to have access to get metric statistics from cloudwatch
    const metricStatisticsStatement = new iam.PolicyStatement({
      resources: ['*'],
      actions: ['cloudwatch:GetMetricStatistics'],
    });

    this.addToRolePolicy(metricStatisticsStatement);

    // have the analytics collector run every day
    const everyDayRule = new events.Rule(scope, 'analytics-collector-cron', {
      schedule: events.Schedule.cron({
        minute: '0',
        hour: '0',
      }),
    });

    everyDayRule.addTarget(new eventstargets.LambdaFunction(this));
  }
}
