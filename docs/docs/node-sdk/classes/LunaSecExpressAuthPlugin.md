---
id: "LunaSecExpressAuthPlugin"
title: "Class: LunaSecExpressAuthPlugin"
sidebar_label: "LunaSecExpressAuthPlugin"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new LunaSecExpressAuthPlugin**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`ExpressAuthPluginConfig`](../interfaces/ExpressAuthPluginConfig.md) |

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:22](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L22)

## Properties

### auth

• `Private` `Readonly` **auth**: `LunaSecAuthentication`

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:19](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L19)

___

### config

• `Private` `Readonly` **config**: [`ExpressAuthPluginConfig`](../interfaces/ExpressAuthPluginConfig.md)

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:20](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L20)

___

### secureFrameUrl

• `Private` `Readonly` **secureFrameUrl**: `string`

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:18](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L18)

## Methods

### buildSecureFrameRedirectUrl

▸ **buildSecureFrameRedirectUrl**(`stateToken`, `sessionId`): `Promise`<``null`` \| `URL`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `stateToken` | `string` |
| `sessionId` | `string` |

#### Returns

`Promise`<``null`` \| `URL`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:43](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L43)

___

### filterClaims

▸ **filterClaims**(`payload`): `any`

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `JWTPayload` |

#### Returns

`any`

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:28](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L28)

___

### handleJwksRequest

▸ **handleJwksRequest**(`_req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `_req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:97](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L97)

___

### handleSecureFrameAuthRequest

▸ **handleSecureFrameAuthRequest**(`req`, `res`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `req` | `Request`<`ParamsDictionary`, `any`, `any`, `ParsedQs`, `Record`<`string`, `any`\>\> |
| `res` | `Response`<`any`, `Record`<`string`, `any`\>\> |

#### Returns

`Promise`<`void`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:63](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L63)

___

### register

▸ **register**(`app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Router` |

#### Returns

`void`

#### Defined in

[js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts:110](https://github.com/refinery-labs/lunasec-node-monorepo/blob/455e30d/js/sdks/packages/node-sdk/src/express-auth-plugin/index.ts#L110)
