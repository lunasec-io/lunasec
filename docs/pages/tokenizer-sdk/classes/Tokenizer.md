---
id: "Tokenizer"
title: "Class: Tokenizer"
sidebar_label: "Tokenizer"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new Tokenizer**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `Partial`<[`TokenizerClientConfig`](../interfaces/TokenizerClientConfig.md)\> |

#### Defined in

[tokenizer.ts:30](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L30)

## Properties

### config

• `Readonly` **config**: [`TokenizerClientConfig`](../interfaces/TokenizerClientConfig.md)

#### Defined in

[tokenizer.ts:26](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L26)

___

### openApi

• `Readonly` **openApi**: [`DefaultApi`](DefaultApi.md)

#### Defined in

[tokenizer.ts:27](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L27)

___

### reqOptions

• `Private` `Readonly` **reqOptions**: `Record`<`string`, `any`\>

#### Defined in

[tokenizer.ts:28](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L28)

## Methods

### convertGrantTypeToEnum

▸ `Private` **convertGrantTypeToEnum**(`grantTypeString`): `GrantType`

#### Parameters

| Name | Type |
| :------ | :------ |
| `grantTypeString` | [`GrantTypeUnion`](../modules.md#granttypeunion) |

#### Returns

`GrantType`

#### Defined in

[tokenizer.ts:92](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L92)

___

### createAnyGrant

▸ `Private` **createAnyGrant**(`sessionId`, `tokenId`, `grantType`): `Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenId` | `string` |
| `grantType` | [`GrantType`](../enums/GrantType.md) |

#### Returns

`Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Defined in

[tokenizer.ts:73](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L73)

___

### createDataBaseStoreGrant

▸ **createDataBaseStoreGrant**(`sessionId`, `tokenId`): `Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenId` | `string` |

#### Returns

`Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Defined in

[tokenizer.ts:69](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L69)

___

### createReadGrant

▸ **createReadGrant**(`sessionId`, `tokenId`): `Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenId` | `string` |

#### Returns

`Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean`  }\>

#### Defined in

[tokenizer.ts:65](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L65)

___

### detokenize

▸ **detokenize**(`tokenId`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeResponse`](../interfaces/TokenizerDetokenizeResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeResponse`](../interfaces/TokenizerDetokenizeResponse.md)\>

#### Defined in

[tokenizer.ts:161](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L161)

___

### detokenizeToUrl

▸ **detokenizeToUrl**(`tokenId`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeToUrlResponse`](../interfaces/TokenizerDetokenizeToUrlResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeToUrlResponse`](../interfaces/TokenizerDetokenizeToUrlResponse.md)\>

#### Defined in

[tokenizer.ts:175](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L175)

___

### getBasePath

▸ `Private` **getBasePath**(): `string`

#### Returns

`string`

#### Defined in

[tokenizer.ts:51](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L51)

___

### getMetadata

▸ **getMetadata**(`tokenId`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerGetMetadataResponse`](../interfaces/TokenizerGetMetadataResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerGetMetadataResponse`](../interfaces/TokenizerGetMetadataResponse.md)\>

#### Defined in

[tokenizer.ts:122](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L122)

___

### handleError

▸ `Private` **handleError**(`e`): [`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `AxiosError`<`any`\> \| `Error` |

#### Returns

[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md)

#### Defined in

[tokenizer.ts:58](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L58)

___

### tokenize

▸ **tokenize**(`input`, `metadata`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerTokenizeResponse`](../interfaces/TokenizerTokenizeResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` \| `Buffer` |
| `metadata` | [`MetaData`](../modules.md#metadata) |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerTokenizeResponse`](../interfaces/TokenizerTokenizeResponse.md)\>

#### Defined in

[tokenizer.ts:140](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L140)

___

### verifyGrant

▸ **verifyGrant**(`sessionId`, `tokenId`, `grantType`): `Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean` = true; `valid`: `boolean`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `sessionId` | `string` |
| `tokenId` | `string` |
| `grantType` | [`GrantTypeUnion`](../modules.md#granttypeunion) |

#### Returns

`Promise`<[`TokenizerFailApiResponse`](../interfaces/TokenizerFailApiResponse.md) \| { `success`: `boolean` = true; `valid`: `boolean`  }\>

#### Defined in

[tokenizer.ts:102](https://github.com/refinery-labs/lunasec-monorepo/blob/84c42bc/js/sdks/packages/tokenizer-sdk/src/tokenizer.ts#L102)
