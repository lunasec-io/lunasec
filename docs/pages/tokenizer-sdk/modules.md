---
id: "modules"
title: "@lunasec/tokenizer-sdk"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Enumerations

- [GrantType](enums/GrantType.md)

## Classes

- [Configuration](classes/Configuration.md)
- [DefaultApi](classes/DefaultApi.md)
- [SimpleTokenizer](classes/SimpleTokenizer.md)
- [Tokenizer](classes/Tokenizer.md)

## Interfaces

- [ConfigurationParameters](interfaces/ConfigurationParameters.md)
- [DetokenizeRequest](interfaces/DetokenizeRequest.md)
- [DetokenizeResponse](interfaces/DetokenizeResponse.md)
- [DetokenizeResponseData](interfaces/DetokenizeResponseData.md)
- [ErrorResponse](interfaces/ErrorResponse.md)
- [FileMeta](interfaces/FileMeta.md)
- [FileMetaFileinfo](interfaces/FileMetaFileinfo.md)
- [GetMetadataRequest](interfaces/GetMetadataRequest.md)
- [GetMetadataResponse](interfaces/GetMetadataResponse.md)
- [GetMetadataResponseData](interfaces/GetMetadataResponseData.md)
- [SetGrantRequest](interfaces/SetGrantRequest.md)
- [SetGrantResponse](interfaces/SetGrantResponse.md)
- [StringMeta](interfaces/StringMeta.md)
- [TokenizeRequest](interfaces/TokenizeRequest.md)
- [TokenizeResponse](interfaces/TokenizeResponse.md)
- [TokenizeResponseData](interfaces/TokenizeResponseData.md)
- [TokenizerClientConfig](interfaces/TokenizerClientConfig.md)
- [TokenizerDetokenizeResponse](interfaces/TokenizerDetokenizeResponse.md)
- [TokenizerDetokenizeToUrlResponse](interfaces/TokenizerDetokenizeToUrlResponse.md)
- [TokenizerFailApiResponse](interfaces/TokenizerFailApiResponse.md)
- [TokenizerGetMetadataResponse](interfaces/TokenizerGetMetadataResponse.md)
- [TokenizerSetGrantResponse](interfaces/TokenizerSetGrantResponse.md)
- [TokenizerTokenizeResponse](interfaces/TokenizerTokenizeResponse.md)
- [TokenizerVerifyGrantResponse](interfaces/TokenizerVerifyGrantResponse.md)
- [VerifyGrantRequest](interfaces/VerifyGrantRequest.md)
- [VerifyGrantResponse](interfaces/VerifyGrantResponse.md)
- [VerifyGrantResponseData](interfaces/VerifyGrantResponseData.md)

## Type aliases

### GrantTypeUnion

Ƭ **GrantTypeUnion**: [`GrantType`](enums/GrantType.md)[keyof [`GrantType`](enums/GrantType.md)]

#### Defined in

[types.ts:61](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/types.ts#L61)

___

### MetaData

Ƭ **MetaData**: [`FileMeta`](interfaces/FileMeta.md) \| [`StringMeta`](interfaces/StringMeta.md)

**`export`**

#### Defined in

[generated/api.ts:216](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L216)

___

### SuccessOrFailOutput

Ƭ **SuccessOrFailOutput**<`S`\>: `Promise`<`S` \| [`TokenizerFailApiResponse`](interfaces/TokenizerFailApiResponse.md)\>

#### Type parameters

| Name |
| :------ |
| `S` |

#### Defined in

[types.ts:59](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/types.ts#L59)

## Variables

### GrantTypeEnum

• `Const` **GrantTypeEnum**: typeof [`GrantType`](enums/GrantType.md)

#### Defined in

[types.ts:4](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/types.ts#L4)

## Functions

### DefaultApiAxiosParamCreator

▸ `Const` **DefaultApiAxiosParamCreator**(`configuration?`): `Object`

DefaultApi - axios parameter creator

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](classes/Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `detokenize` | (`detokenizeRequest`: [`DetokenizeRequest`](interfaces/DetokenizeRequest.md), `options`: `any`) => `Promise`<`RequestArgs`\> |
| `getMetaData` | (`getMetadataRequest`: [`GetMetadataRequest`](interfaces/GetMetadataRequest.md), `options`: `any`) => `Promise`<`RequestArgs`\> |
| `setGrant` | (`setGrantRequest`: [`SetGrantRequest`](interfaces/SetGrantRequest.md), `options`: `any`) => `Promise`<`RequestArgs`\> |
| `tokenize` | (`tokenizeRequest`: [`TokenizeRequest`](interfaces/TokenizeRequest.md), `options`: `any`) => `Promise`<`RequestArgs`\> |
| `verifyGrant` | (`verifyGrantRequest`: [`VerifyGrantRequest`](interfaces/VerifyGrantRequest.md), `options`: `any`) => `Promise`<`RequestArgs`\> |

#### Defined in

[generated/api.ts:400](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L400)

___

### DefaultApiFactory

▸ `Const` **DefaultApiFactory**(`configuration?`, `basePath?`, `axios?`): `Object`

DefaultApi - factory interface

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](classes/Configuration.md) |
| `basePath?` | `string` |
| `axios?` | `AxiosInstance` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `detokenize` | (`detokenizeRequest`: [`DetokenizeRequest`](interfaces/DetokenizeRequest.md), `options?`: `any`) => `AxiosPromise`<[`DetokenizeResponse`](interfaces/DetokenizeResponse.md)\> |
| `getMetaData` | (`getMetadataRequest`: [`GetMetadataRequest`](interfaces/GetMetadataRequest.md), `options?`: `any`) => `AxiosPromise`<[`GetMetadataResponse`](interfaces/GetMetadataResponse.md)\> |
| `setGrant` | (`setGrantRequest`: [`SetGrantRequest`](interfaces/SetGrantRequest.md), `options?`: `any`) => `AxiosPromise`<[`SetGrantResponse`](interfaces/SetGrantResponse.md)\> |
| `tokenize` | (`tokenizeRequest`: [`TokenizeRequest`](interfaces/TokenizeRequest.md), `options?`: `any`) => `AxiosPromise`<[`TokenizeResponse`](interfaces/TokenizeResponse.md)\> |
| `verifyGrant` | (`verifyGrantRequest`: [`VerifyGrantRequest`](interfaces/VerifyGrantRequest.md), `options?`: `any`) => `AxiosPromise`<[`VerifyGrantResponse`](interfaces/VerifyGrantResponse.md)\> |

#### Defined in

[generated/api.ts:654](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L654)

___

### DefaultApiFp

▸ `Const` **DefaultApiFp**(`configuration?`): `Object`

DefaultApi - functional programming interface

**`export`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](classes/Configuration.md) |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `detokenize` | (`detokenizeRequest`: [`DetokenizeRequest`](interfaces/DetokenizeRequest.md), `options?`: `any`) => `Promise`<`fn`\> |
| `getMetaData` | (`getMetadataRequest`: [`GetMetadataRequest`](interfaces/GetMetadataRequest.md), `options?`: `any`) => `Promise`<`fn`\> |
| `setGrant` | (`setGrantRequest`: [`SetGrantRequest`](interfaces/SetGrantRequest.md), `options?`: `any`) => `Promise`<`fn`\> |
| `tokenize` | (`tokenizeRequest`: [`TokenizeRequest`](interfaces/TokenizeRequest.md), `options?`: `any`) => `Promise`<`fn`\> |
| `verifyGrant` | (`verifyGrantRequest`: [`VerifyGrantRequest`](interfaces/VerifyGrantRequest.md), `options?`: `any`) => `Promise`<`fn`\> |

#### Defined in

[generated/api.ts:589](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L589)

___

### isToken

▸ **isToken**(`s`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `s` | `string` |

#### Returns

`boolean`

#### Defined in

[utils/is-token.ts:3](https://github.com/refinery-labs/lunasec-monorepo/blob/5000269/js/sdks/packages/tokenizer-sdk/src/utils/is-token.ts#L3)
