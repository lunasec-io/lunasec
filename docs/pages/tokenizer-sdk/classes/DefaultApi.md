---
id: "DefaultApi"
title: "Class: DefaultApi"
sidebar_label: "DefaultApi"
sidebar_position: 0
custom_edit_url: null
---

DefaultApi - object-oriented interface

**`export`**

## Hierarchy

- `BaseAPI`

  ↳ **`DefaultApi`**

## Constructors

### constructor

• **new DefaultApi**(`configuration?`, `basePath?`, `axios?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `configuration?` | [`Configuration`](Configuration.md) |
| `basePath` | `string` |
| `axios` | `AxiosInstance` |

#### Inherited from

BaseAPI.constructor

#### Defined in

[generated/base.ts:52](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/base.ts#L52)

## Properties

### axios

• `Protected` **axios**: `AxiosInstance`

#### Inherited from

BaseAPI.axios

___

### basePath

• `Protected` **basePath**: `string`

#### Inherited from

BaseAPI.basePath

___

### configuration

• `Protected` **configuration**: `undefined` \| [`Configuration`](Configuration.md)

#### Inherited from

BaseAPI.configuration

#### Defined in

[generated/base.ts:50](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/base.ts#L50)

## Methods

### detokenize

▸ **detokenize**(`detokenizeRequest`, `options?`): `Promise`<`AxiosResponse`<[`DetokenizeResponse`](../interfaces/DetokenizeResponse.md)\>\>

**`summary`** Get an S3 signed download URL for a token

**`throws`** {RequiredError}

**`memberof`** DefaultApi

#### Parameters

| Name | Type |
| :------ | :------ |
| `detokenizeRequest` | [`DetokenizeRequest`](../interfaces/DetokenizeRequest.md) |
| `options?` | `any` |

#### Returns

`Promise`<`AxiosResponse`<[`DetokenizeResponse`](../interfaces/DetokenizeResponse.md)\>\>

#### Defined in

[generated/api.ts:725](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L725)

___

### getMetaData

▸ **getMetaData**(`getMetadataRequest`, `options?`): `Promise`<`AxiosResponse`<[`GetMetadataResponse`](../interfaces/GetMetadataResponse.md)\>\>

**`summary`** Get an S3 signed download URL for a token

**`throws`** {RequiredError}

**`memberof`** DefaultApi

#### Parameters

| Name | Type |
| :------ | :------ |
| `getMetadataRequest` | [`GetMetadataRequest`](../interfaces/GetMetadataRequest.md) |
| `options?` | `any` |

#### Returns

`Promise`<`AxiosResponse`<[`GetMetadataResponse`](../interfaces/GetMetadataResponse.md)\>\>

#### Defined in

[generated/api.ts:737](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L737)

___

### setGrant

▸ **setGrant**(`setGrantRequest`, `options?`): `Promise`<`AxiosResponse`<[`SetGrantResponse`](../interfaces/SetGrantResponse.md)\>\>

**`summary`** Create a grant for a token, of type store or read

**`throws`** {RequiredError}

**`memberof`** DefaultApi

#### Parameters

| Name | Type |
| :------ | :------ |
| `setGrantRequest` | [`SetGrantRequest`](../interfaces/SetGrantRequest.md) |
| `options?` | `any` |

#### Returns

`Promise`<`AxiosResponse`<[`SetGrantResponse`](../interfaces/SetGrantResponse.md)\>\>

#### Defined in

[generated/api.ts:749](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L749)

___

### tokenize

▸ **tokenize**(`tokenizeRequest`, `options?`): `Promise`<`AxiosResponse`<[`TokenizeResponse`](../interfaces/TokenizeResponse.md)\>\>

**`summary`** Submit metadata about a token that was uploaded to s3

**`throws`** {RequiredError}

**`memberof`** DefaultApi

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenizeRequest` | [`TokenizeRequest`](../interfaces/TokenizeRequest.md) |
| `options?` | `any` |

#### Returns

`Promise`<`AxiosResponse`<[`TokenizeResponse`](../interfaces/TokenizeResponse.md)\>\>

#### Defined in

[generated/api.ts:761](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L761)

___

### verifyGrant

▸ **verifyGrant**(`verifyGrantRequest`, `options?`): `Promise`<`AxiosResponse`<[`VerifyGrantResponse`](../interfaces/VerifyGrantResponse.md)\>\>

**`summary`** Get an S3 signed download URL for a token

**`throws`** {RequiredError}

**`memberof`** DefaultApi

#### Parameters

| Name | Type |
| :------ | :------ |
| `verifyGrantRequest` | [`VerifyGrantRequest`](../interfaces/VerifyGrantRequest.md) |
| `options?` | `any` |

#### Returns

`Promise`<`AxiosResponse`<[`VerifyGrantResponse`](../interfaces/VerifyGrantResponse.md)\>\>

#### Defined in

[generated/api.ts:773](https://github.com/refinery-labs/lunasec-monorepo/blob/59906a9/js/sdks/packages/tokenizer-sdk/src/generated/api.ts#L773)
