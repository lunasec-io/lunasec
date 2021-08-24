---
id: "SimpleTokenizer"
title: "Class: SimpleTokenizer"
sidebar_label: "SimpleTokenizer"
sidebar_position: 0
custom_edit_url: null
---

## Constructors

### constructor

• **new SimpleTokenizer**(`config?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config?` | `Partial`<[`TokenizerClientConfig`](../interfaces/TokenizerClientConfig.md)\> |

#### Defined in

[simple-tokenizer.ts:7](https://github.com/refinery-labs/lunasec-monorepo/blob/6c5edb8/js/sdks/packages/tokenizer-sdk/src/simple-tokenizer.ts#L7)

## Properties

### tokenizer

• `Private` `Readonly` **tokenizer**: [`Tokenizer`](Tokenizer.md)

#### Defined in

[simple-tokenizer.ts:6](https://github.com/refinery-labs/lunasec-monorepo/blob/6c5edb8/js/sdks/packages/tokenizer-sdk/src/simple-tokenizer.ts#L6)

## Methods

### detokenize

▸ **detokenize**(`tokenId`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeResponse`](../interfaces/TokenizerDetokenizeResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenId` | `string` |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerDetokenizeResponse`](../interfaces/TokenizerDetokenizeResponse.md)\>

#### Defined in

[simple-tokenizer.ts:21](https://github.com/refinery-labs/lunasec-monorepo/blob/6c5edb8/js/sdks/packages/tokenizer-sdk/src/simple-tokenizer.ts#L21)

___

### tokenize

▸ **tokenize**(`input`): [`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerTokenizeResponse`](../interfaces/TokenizerTokenizeResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` \| `Buffer` |

#### Returns

[`SuccessOrFailOutput`](../modules.md#successorfailoutput)<[`TokenizerTokenizeResponse`](../interfaces/TokenizerTokenizeResponse.md)\>

#### Defined in

[simple-tokenizer.ts:17](https://github.com/refinery-labs/lunasec-monorepo/blob/6c5edb8/js/sdks/packages/tokenizer-sdk/src/simple-tokenizer.ts#L17)
