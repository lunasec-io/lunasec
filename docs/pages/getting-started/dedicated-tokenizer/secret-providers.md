---
id: "secret-providers"
title: "Secret Providers"
sidebar_label: "Secret Providers"
sidebar_position: 7
---

# Available Secret Providers

LunaSec currently supports the following secret providers:

## Manual

Provide a `'<siging key>'` as a `KeyLike` value.

```typescript
import { createPrivateKey } from 'crypto';

export const lunaSec = new LunaSec({
  auth: {
    secrets: {
      provider: 'manual',
      signingKey: createPrivateKey('<signing key>')
    },
  }
});
```

## Environment Variable

Set the environment variable `LUNASEC_SIGING_KEY` which will be detected by LunaSec at runtime.

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
