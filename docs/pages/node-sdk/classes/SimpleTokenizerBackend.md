---
id: "SimpleTokenizerBackend"
title: "Class: SimpleTokenizerBackend"
sidebar_label: "SimpleTokenizerBackend"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SimpleTokenizerBackend**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | [`SimpleTokenizerBackendConfig`](../interfaces/SimpleTokenizerBackendConfig.md) |

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:26](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L26)

## Properties

### config

• `Optional` `Readonly` **config**: [`SimpleTokenizerBackendConfig`](../interfaces/SimpleTokenizerBackendConfig.md)

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:25](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L25)

## Methods

### createTokenPresignedUrl

▸ **createTokenPresignedUrl**(`tokenId`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:88](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L88)

___

### generatePresignedS3Url

▸ **generatePresignedS3Url**(`tokenId`, `method`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |
| `method` | ``"PUT"`` \| ``"GET"`` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:53](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L53)

___

### getAwsCredentials

▸ **getAwsCredentials**(): `Promise`<`Credentials` \| `Provider`<`Credentials`\>\>

#### Returns

`Promise`<`Credentials` \| `Provider`<`Credentials`\>\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:30](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L30)

___

### getTokenPresignedUrl

▸ **getTokenPresignedUrl**(`tokenId`): `Promise`<`Object`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

`Promise`<`Object`\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:84](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L84)

___

### register

▸ **register**(`app`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `app` | `Application` |

#### Returns

`void`

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:92](https://github.com/refinery-labs/lunasec-node-monorepo/blob/1458e7a/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L92)
