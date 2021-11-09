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
id: "DeploymentConfigOptions"
title: "Interface: DeploymentConfigOptions"
sidebar_label: "DeploymentConfigOptions"
sidebar_position: 0
custom_edit_url: null
---

Deployment configuration options can adjust how the LunaSec stack is deployed to AWS.

## Properties

### grants

• **grants**: [`GrantConfigOptions`](GrantConfigOptions.md)

#### Defined in

[types.ts:151](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L151)

___

### metrics

• **metrics**: [`MetricConfigOptions`](MetricConfigOptions.md)

#### Defined in

[types.ts:152](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L152)

___

### applicationFrontEnd

• `Optional` **applicationFrontEnd**: `string`

[required] The front end of your application where you will be including LunaSec Secure Components.

#### Defined in

[types.ts:124](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L124)

___

### applicationBackEnd

• `Optional` **applicationBackEnd**: `string`

[required] The back end of your application where LunaSec will be registered.

#### Defined in

[types.ts:128](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L128)

___

### sessionPublicKey

• `Optional` **sessionPublicKey**: `string`

Your authentication provider's public key (ex. Auth0) to be used for verifying sessions.

#### Defined in

[types.ts:132](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L132)

___

### sessionJwksEndpoint

• `Optional` **sessionJwksEndpoint**: `string`

The JWKS url where the public key for creating sessions will be available. By default, this is set to: applicationBackEnd/.lunasec/jwks.json.

#### Defined in

[types.ts:136](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L136)

___

### localStackUrl

• `Optional` **localStackUrl**: `string`

Only used for local deployments to localstack. The URL for LocalStack.

#### Defined in

[types.ts:140](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L140)

___

### serviceVersions

• `Optional` **serviceVersions**: [`ServiceVersions`](../index.md#serviceversions)

Pin services to specific versions. This is discouraged as the LunaSec stack
is meant to be deployed using the same version for every component, but if
a service is breaking, it could be helpful to revert specific services as a hot patch.

#### Defined in

[types.ts:146](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L146)

___

### localBuildArtifacts

• `Optional` **localBuildArtifacts**: `boolean`

Only used when building locally. Use local build artifacts when bringing up the stack, built by the monorepo.

#### Defined in

[types.ts:150](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L150)

___

### frontEndAssetsFolder

• `Optional` **frontEndAssetsFolder**: `string`

Only used when building locally. Specify the build location of where the built secure frame iframe exists.

#### Defined in

[types.ts:156](https://github.com/lunasec-io/lunasec/blob/18ce926e/js/sdks/packages/cli/src/config/types.ts#L156)
