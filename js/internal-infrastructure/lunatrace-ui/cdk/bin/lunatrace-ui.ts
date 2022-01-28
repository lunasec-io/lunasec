#!/usr/bin/env node
/*
 * Copyright 2022 by LunaSec (owned by Refinery Labs, Inc)
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
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { LunatraceUiStack } from '../lib/lunatrace-ui-stack';

const domainName = process.env.STACK_DOMAIN_NAME;

if (!domainName) {
  throw new Error('STACK_DOMAIN_NAME is not set');
}

const domainZoneId = process.env.STACK_DOMAIN_ZONE_ID;

if (!domainZoneId) {
  throw new Error('STACK_DOMAIN_ZONE_ID is not set');
}

const app = new cdk.App();
new LunatraceUiStack(app, 'LunatraceUiStack', {
  domainName,
  domainZoneId,
});
