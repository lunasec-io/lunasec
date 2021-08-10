---
id: "SimpleTokenizerBackend"
title: "Class: SimpleTokenizerBackend"
sidebar_label: "SimpleTokenizerBackend"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SimpleTokenizerBackend**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`SimpleTokenizerBackendConfig`](../interfaces/SimpleTokenizerBackendConfig.md) |

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:26](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L26)

## Properties

### config

• `Readonly` **config**: [`SimpleTokenizerBackendConfig`](../interfaces/SimpleTokenizerBackendConfig.md)

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:24](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L24)

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

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:90](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L90)

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

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:58](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L58)

___

### getAwsCredentials

▸ **getAwsCredentials**(): `Promise`<[`AwsCredentials`](../interfaces/AwsCredentials.md)\>

#### Returns

`Promise`<[`AwsCredentials`](../interfaces/AwsCredentials.md)\>

#### Defined in

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:38](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L38)

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

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:86](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L86)

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

[js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts:94](https://github.com/refinery-labs/lunasec-node-monorepo/blob/c68ba64/js/sdks/packages/node-sdk/src/express-simple-tokenizer-backend/simple-tokenizer-backend.ts#L94)
