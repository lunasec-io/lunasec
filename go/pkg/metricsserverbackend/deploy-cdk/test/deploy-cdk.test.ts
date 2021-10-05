import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as DeployCdk from '../lib/deploy-cdk-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DeployCdk.LunaSecMetricsServerBackendStack(app, 'MyTestStack', {
      domainName: 'foo.bar.baz',
      domainZone: 'baz-foo'
    });
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
