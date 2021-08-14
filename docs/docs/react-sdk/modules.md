---
id: "modules"
title: "@lunasec/react-sdk"
sidebar_label: "Exports"
sidebar_position: 0.5
custom_edit_url: null
---

## Classes

- [SecureForm](classes/SecureForm.md)
- [SecureSubmit](classes/SecureSubmit.md)

## Interfaces

- [ClassLookup](interfaces/ClassLookup.md)
- [LunaSecConfigContextProps](interfaces/LunaSecConfigContextProps.md)
- [LunaSecWrappedComponentProps](interfaces/LunaSecWrappedComponentProps.md)
- [RenderData](interfaces/RenderData.md)
- [SecureFormContextProps](interfaces/SecureFormContextProps.md)
- [SecureFormProps](interfaces/SecureFormProps.md)
- [SecureSubmitProps](interfaces/SecureSubmitProps.md)
- [TagLookup](interfaces/TagLookup.md)

## Type aliases

### ComponentNames

Ƭ **ComponentNames**: keyof [`ClassLookup`](interfaces/ClassLookup.md)

#### Defined in

[js/sdks/packages/react-sdk/src/types.ts:29](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/types.ts#L29)

___

### LunaSecConfigContextType

Ƭ **LunaSecConfigContextType**: `React.ContextType`<typeof [`LunaSecConfigContext`](modules.md#lunasecconfigcontext)\>

#### Defined in

[js/sdks/packages/react-sdk/src/providers/LunaSecConfigContext.ts:16](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/providers/LunaSecConfigContext.ts#L16)

___

### SecureFormContextType

Ƭ **SecureFormContextType**: `React.ContextType`<typeof [`SecureFormContext`](modules.md#secureformcontext)\>

#### Defined in

[js/sdks/packages/react-sdk/src/providers/SecureFormContext.ts:24](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/providers/SecureFormContext.ts#L24)

___

### WrappedComponentProps

Ƭ **WrappedComponentProps**<`C`\>: [`LunaSecWrappedComponentProps`](interfaces/LunaSecWrappedComponentProps.md)<`C`\> & `React.ComponentPropsWithoutRef`<[`TagLookup`](interfaces/TagLookup.md)[`C`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends keyof [`ClassLookup`](interfaces/ClassLookup.md) |

#### Defined in

[js/sdks/packages/react-sdk/src/types.ts:59](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/types.ts#L59)

___

### WrapperProps

Ƭ **WrapperProps**<`C`\>: `LunaSecWrapperProps`<`C`\> & `React.ComponentPropsWithoutRef`<[`TagLookup`](interfaces/TagLookup.md)[`C`]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends keyof [`ClassLookup`](interfaces/ClassLookup.md) |

#### Defined in

[js/sdks/packages/react-sdk/src/types.ts:44](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/types.ts#L44)

___

### WrapperPropsWithProviders

Ƭ **WrapperPropsWithProviders**<`C`\>: [`WrapperProps`](modules.md#wrapperprops)<`C`\> & `Providers`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `C` | extends keyof [`ClassLookup`](interfaces/ClassLookup.md) |

#### Defined in

[js/sdks/packages/react-sdk/src/types.ts:51](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/types.ts#L51)

## Variables

### LunaSecConfigContext

• `Const` **LunaSecConfigContext**: `Context`<[`LunaSecConfigContextProps`](interfaces/LunaSecConfigContextProps.md)\>

#### Defined in

[js/sdks/packages/react-sdk/src/providers/LunaSecConfigContext.ts:9](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/providers/LunaSecConfigContext.ts#L9)

___

### SecureFormContext

• `Const` **SecureFormContext**: `Context`<[`SecureFormContextProps`](interfaces/SecureFormContextProps.md)\>

#### Defined in

[js/sdks/packages/react-sdk/src/providers/SecureFormContext.ts:12](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/providers/SecureFormContext.ts#L12)

___

### componentNames

• `Const` **componentNames**: keyof [`ClassLookup`](interfaces/ClassLookup.md)[]

#### Defined in

[js/sdks/packages/react-sdk/src/types.ts:28](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/types.ts#L28)

## Functions

### SecureDownload

▸ `Const` **SecureDownload**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WrapperProps`](modules.md#wrapperprops)<``"Downloader"``\> |

#### Returns

`Element`

#### Defined in

[js/sdks/packages/react-sdk/src/index.ts:13](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/index.ts#L13)

___

### SecureInput

▸ `Const` **SecureInput**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WrapperProps`](modules.md#wrapperprops)<``"Input"``\> |

#### Returns

`Element`

#### Defined in

[js/sdks/packages/react-sdk/src/index.ts:16](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/index.ts#L16)

___

### SecureParagraph

▸ `Const` **SecureParagraph**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WrapperProps`](modules.md#wrapperprops)<``"Paragraph"``\> |

#### Returns

`Element`

#### Defined in

[js/sdks/packages/react-sdk/src/index.ts:12](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/index.ts#L12)

___

### SecureTextArea

▸ `Const` **SecureTextArea**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WrapperProps`](modules.md#wrapperprops)<``"TextArea"``\> |

#### Returns

`Element`

#### Defined in

[js/sdks/packages/react-sdk/src/index.ts:15](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/index.ts#L15)

___

### SecureUpload

▸ `Const` **SecureUpload**(`props`): `Element`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`WrapperProps`](modules.md#wrapperprops)<``"Uploader"``\> |

#### Returns

`Element`

#### Defined in

[js/sdks/packages/react-sdk/src/index.ts:14](https://github.com/refinery-labs/lunasec-monorepo/blob/415fd94/js/sdks/packages/react-sdk/src/index.ts#L14)
