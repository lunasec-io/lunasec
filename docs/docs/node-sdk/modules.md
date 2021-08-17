---
id: "modules"
title: "@lunasec/node-sdk"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [DeploymentStage](enums/DeploymentStage.md)

## Classes

- [LunaSec](classes/LunaSec.md)
- [LunaSecExpressAuthPlugin](classes/LunaSecExpressAuthPlugin.md)
- [LunaSecGrantService](classes/LunaSecGrantService.md)
- [SecureResolver](classes/SecureResolver.md)
- [SimpleTokenizerBackend](classes/SimpleTokenizerBackend.md)
- [TokenDirective](classes/TokenDirective.md)

## Interfaces

- [AwsCredentials](interfaces/AwsCredentials.md)
- [ExpressAuthPluginConfig](interfaces/ExpressAuthPluginConfig.md)
- [FunctionConfig](interfaces/FunctionConfig.md)
- [FunctionInvocationResult](interfaces/FunctionInvocationResult.md)
- [LunaSecConfig](interfaces/LunaSecConfig.md)
- [SecureResolverSdkConfig](interfaces/SecureResolverSdkConfig.md)
- [SimpleTokenizerBackendConfig](interfaces/SimpleTokenizerBackendConfig.md)

## Functions

### setGrantServiceForDirective

▸ **setGrantServiceForDirective**(`service`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `service` | [`LunaSecGrantService`](classes/LunaSecGrantService.md) |

#### Returns

`void`

#### Defined in

[js/sdks/packages/node-sdk/src/graphql/lunasec-token-directive.ts:20](https://github.com/refinery-labs/lunasec-monorepo/blob/03d4513/js/sdks/packages/node-sdk/src/graphql/lunasec-token-directive.ts#L20)
