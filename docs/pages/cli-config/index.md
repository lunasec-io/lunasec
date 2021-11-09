<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
---
id: "index"
title: "@lunasec/cli"
slug: "/cli-config"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Interfaces

- [LunaSecStackConfigOptions](interfaces/LunaSecStackConfigOptions.md)
- [GrantConfigOptions](interfaces/GrantConfigOptions.md)
- [DevelopmentConfigOptions](interfaces/DevelopmentConfigOptions.md)
- [MetricConfigOptions](interfaces/MetricConfigOptions.md)
- [DeploymentConfigOptions](interfaces/DeploymentConfigOptions.md)

## Variables

### grantConfigOptionsDefaults

• `Const` **grantConfigOptionsDefaults**: [`GrantConfigOptions`](interfaces/GrantConfigOptions.md)

#### Defined in

[types.ts:40](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L40)

___

### devConfigOptionsDefaults

• `Const` **devConfigOptionsDefaults**: [`DevelopmentConfigOptions`](interfaces/DevelopmentConfigOptions.md)

#### Defined in

[types.ts:81](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L81)

___

### metricConfigOptionsDefaults

• `Const` **metricConfigOptionsDefaults**: [`MetricConfigOptions`](interfaces/MetricConfigOptions.md)

#### Defined in

[types.ts:112](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L112)

___

### deploymentConfigOptionsDefaults

• `Const` **deploymentConfigOptionsDefaults**: [`DeploymentConfigOptions`](interfaces/DeploymentConfigOptions.md)

#### Defined in

[types.ts:159](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L159)

## Type aliases

### LunaSecServices

Ƭ **LunaSecServices**: ``"tokenizer-backend"`` \| ``"secure-frame-frontend"`` \| ``"analytics-collector"``

#### Defined in

[types.ts:92](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L92)

___

### ServiceVersions

Ƭ **ServiceVersions**: `Record`<[`LunaSecServices`](index.md#lunasecservices), `string`\>

#### Defined in

[types.ts:94](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L94)

___

### MetricProvider

Ƭ **MetricProvider**: ``"none"`` \| ``"aws_cloudwatch"``

#### Defined in

[types.ts:96](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L96)
