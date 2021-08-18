---
id: "SecureResolver"
title: "Class: SecureResolver"
sidebar_label: "SecureResolver"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SecureResolver**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SecureResolverSdkConfig`](../interfaces/SecureResolverSdkConfig.md) |

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:61](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L61)

## Properties

### apiClient

• `Readonly` **apiClient**: `GenericApiClient`

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:48](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L48)

___

### config

• `Readonly` **config**: [`SecureResolverSdkConfig`](../interfaces/SecureResolverSdkConfig.md)

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:41](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L41)

___

### containerHeaders

• `Readonly` **containerHeaders**: `Record`<`string`, `string`\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:46](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L46)

___

### functionConfig

• `Readonly` **functionConfig**: [`FunctionConfig`](../interfaces/FunctionConfig.md)

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:43](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L43)

___

### functionStageLookup

• `Readonly` **functionStageLookup**: `Record`<[`DeploymentStage`](../enums/DeploymentStage.md), `SecureResolverFunctions`\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:50](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L50)

___

### refineryHeaders

• `Readonly` **refineryHeaders**: `Record`<`string`, `string`\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:45](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L45)

## Methods

### call

▸ **call**(`functionName`, `args`): `Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `args` | `unknown` |

#### Returns

`Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:178](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L178)

___

### callDev

▸ **callDev**(`functionName`, `functionArgs`): `Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `functionArgs` | `unknown` |

#### Returns

`Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:183](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L183)

___

### callProd

▸ **callProd**(`functionName`, `functionArgs`): `Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `functionName` | `string` |
| `functionArgs` | `unknown` |

#### Returns

`Promise`<[`FunctionInvocationResult`](../interfaces/FunctionInvocationResult.md)\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:228](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L228)

___

### deploy

▸ **deploy**(`containerUri`): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerUri` | `string` |

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:132](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L132)

___

### deployDev

▸ **deployDev**(`containerUri`): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerUri` | `string` |

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:138](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L138)

___

### deployProd

▸ **deployProd**(`containerUri`): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `containerUri` | `string` |

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`BuildResolverResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:146](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L146)

___

### getFunctionUrl

▸ **getFunctionUrl**(`deploymentId`): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`GetResolverUrlResponse`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deploymentId` | `string` |

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`GetResolverUrlResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:274](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L274)

___

### listDeployments

▸ **listDeployments**(): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`ListDeploymentsResponse`\>\>

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`ListDeploymentsResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:302](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L302)

___

### listFunctions

▸ **listFunctions**(`deploymentId`): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`ListFunctionsResponse`\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `deploymentId` | `string` |

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`ListFunctionsResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:292](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L292)

___

### removeDeployment

▸ **removeDeployment**(): `Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`RemoveResolverResponse`\>\>

#### Returns

`Promise`<`SecureEnclaveFailApiResponse` \| `SecureEnclaveSuccessApiResponse`<`RemoveResolverResponse`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:283](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L283)

___

### wrap

▸ **wrap**<`T`, `U`\>(`fn`): (...`args`: `T`) => `Promise`<`undefined` \| `U`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `unknown`[] |
| `U` | `U` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fn` | (...`args`: `T`) => `U` |

#### Returns

`fn`

▸ (...`args`): `Promise`<`undefined` \| `U`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `...args` | `T` |

##### Returns

`Promise`<`undefined` \| `U`\>

#### Defined in

[js/sdks/packages/node-sdk/src/secure-resolver/index.ts:113](https://github.com/refinery-labs/lunasec-monorepo/blob/69269f1/js/sdks/packages/node-sdk/src/secure-resolver/index.ts#L113)
