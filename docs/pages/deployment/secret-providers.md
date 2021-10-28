---
id: "secret-providers"
title: "Secret Providers"
sidebar_label: "Secret Providers"
sidebar_position: 2
---
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
# Available Secret Providers

When we set up the LunaSec Node SDK, we pass a private key that LunaSec uses to establish trust with your app.
LunaSec provides a few different ways to set it:

## Manual

Provide a `'<signing key>'` as a `KeyLike` value.

```typescript
import { createPrivateKey } from 'crypto';

export const lunaSec = new LunaSec({
  auth: {
    secrets: {
      provider: 'manual',
      signingKey: createPrivateKey('PRIVATEKEY123ABC')
    },
  }
});
```

## Environment Variable

Set the environment variable `LUNASEC_SIGNING_KEY` which will be detected by LunaSec at runtime.

```typescript
export const lunaSec = new LunaSec({
  auth: {
    secrets: {
      provider: 'environment'
    },
  }
});
```

## Aws Secrets Manager

Store the signing key in Aws Secrets Manager and provide the ARN to LunaSec.

```typescript
export const lunaSec = new LunaSec({
  auth: {
    secrets: {
      provider: 'awsSecretsManager',
      secretArn: '<secret arn>'
    },
  }
});
```
