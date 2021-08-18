---
id: "LunaSecGrantService"
title: "Class: LunaSecGrantService"
sidebar_label: "LunaSecGrantService"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new LunaSecGrantService**(`auth`, `sessionIdProvider?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `auth` | `LunaSecAuthentication` |
| `sessionIdProvider?` | `SessionIdProvider` |

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:11](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L11)

## Properties

### auth

• `Private` `Readonly` **auth**: `LunaSecAuthentication`

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:8](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L8)

___

### sessionIdProvider

• `Private` `Readonly` **sessionIdProvider**: `undefined` \| `SessionIdProvider`

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:9](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L9)

## Methods

### create

▸ **create**(`sessionId`, `tokenOrTokens`): `Promise`<`void` \| `void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenOrTokens` | `string` \| `string`[] |

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:39](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L39)

___

### createOneGrant

▸ `Private` **createOneGrant**(`sessionId`, `token`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `token` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:27](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L27)

___

### createWithAutomaticSessionId

▸ **createWithAutomaticSessionId**(`req`, `token`): `Promise`<`void` \| `void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `token` | `string` \| `string`[] |

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:107](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L107)

___

### getSessionIdFromReq

▸ `Private` **getSessionIdFromReq**(`req`): `Promise`<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`string`\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:88](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L88)

___

### initializeTokenizer

▸ `Private` **initializeTokenizer**(): `Promise`<`Tokenizer`\>

#### Returns

`Promise`<`Tokenizer`\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:16](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L16)

___

### verify

▸ **verify**(`sessionId`, `tokenOrTokens`, `grantType`): `Promise`<`void` \| `void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenOrTokens` | `string` \| `string`[] |
| `grantType` | `GrantTypeUnion` |

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:72](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L72)

___

### verifyOneGrant

▸ `Private` **verifyOneGrant**(`sessionId`, `tokenId`, `grantType`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenId` | `string` |
| `grantType` | `GrantTypeUnion` |

#### Returns

`Promise`<`void`\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:52](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L52)

___

### verifyWithAutomaticSessionId

▸ **verifyWithAutomaticSessionId**(`req`, `token`, `grantType`): `Promise`<`void` \| `void`[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `token` | `string` \| `string`[] |
| `grantType` | `GrantTypeUnion` |

#### Returns

`Promise`<`void` \| `void`[]\>

#### Defined in

[js/sdks/packages/node-sdk/src/grant-service/index.ts:111](https://github.com/refinery-labs/lunasec-monorepo/blob/6b064f0/js/sdks/packages/node-sdk/src/grant-service/index.ts#L111)
