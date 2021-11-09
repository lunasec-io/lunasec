<!--
  ~ Copyright by LunaSec (owned by Refinery Labs, Inc)
  ~
  ~ Licensed under the Creative Commons Attribution-ShareAlike 4.0 International
  ~ (the "License"); you may not use this file except in compliance with the
  ~ License. You may obtain a copy of the License at
  ~
  ~ https://creativecommons.org/licenses/by-sa/4.0/legalcode
  ~
  ~ See the License for the specific language governing permissions and
  ~ limitations under the License.
  ~
-->
---
id: "DevelopmentConfigOptions"
title: "Interface: DevelopmentConfigOptions"
sidebar_label: "DevelopmentConfigOptions"
sidebar_position: 0
custom_edit_url: null
---

Development configuration options are properties that can be modified to configure local development
when using the LunaSec stack. These properties are available to assist in matching a production
deployment as close as possible.

## Properties

### applicationFrontEnd

• **applicationFrontEnd**: `string`

[required] The front end of your application where you will be including LunaSec Secure Components.

#### Defined in

[types.ts:54](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L54)

___

### applicationBackEnd

• **applicationBackEnd**: `string`

[required] The back end of your application where LunaSec will be registered.

#### Defined in

[types.ts:58](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L58)

___

### sessionJWKSURL

• **sessionJWKSURL**: `string`

The JWKS url where the public key for creating sessions will be available. By default, this is set to: applicationBackEnd/.lunasec/jwks.json.

#### Defined in

[types.ts:62](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L62)

___

### signingKey

• **signingKey**: `string`

This is only used in demo mode. The signing key is used by the application backend in the demo for cryptographically signing sessions.

#### Defined in

[types.ts:66](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L66)

___

### grants

• **grants**: [`GrantConfigOptions`](GrantConfigOptions.md)

Configure how grants behave.

#### Defined in

[types.ts:74](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L74)

___

### localStackUrl

• `Optional` **localStackUrl**: `string`

The URL for LocalStack.

#### Defined in

[types.ts:70](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L70)

___

### localBuildArtifacts

• `Optional` **localBuildArtifacts**: `boolean`

Only used when building locally. Use local build artifacts when bringing up the stack, built by the monorepo.

#### Defined in

[types.ts:78](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L78)
