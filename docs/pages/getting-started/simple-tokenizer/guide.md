---
id: "guide"
title: "Simple Setup"
sidebar_label: "Set Up Guide"
sidebar_position: 0.5
custom_edit_url: null
---

# Simple Tokenizer
If you have chosen to use the Simple Tokenizer, as explained in [Choose your Setup](../choose-your-setup.md), let's get started
adding the Simple Tokenizer to your web app.  

#### Limitiations
Please note that the Simple Tokenizer doesn't interoperate with the rest of LunaSec's modules that you might see mentioned elsewhere in these docs,
and automated migration to the full Dedicated Tokenizer from Simple has not yet been implemented.  What you see on this page 
represents everything the simple tokenizer can do: tokenize and detokenize strings. It is, however, very easy to set up:

## ServerSide

The plugin will add the tokenization backend routes to your app and use S3 as a database.

First, initialize LunaSec and tell the Simple Tokenizer where to store the tokens in S3:

```typescript
import { fromIni } from '@aws-sdk/credential-provider-ini';
import { LunaSec } from '@lunasec/node-sdk';

const lunaSec = new LunaSec({
  simpleTokenizerBackendConfig: {
    awsRegion: 'us-west-2',
    s3Bucket: 'my-bucket',
    getAwsCredentials: () => {
      return Promise.resolve(fromIni()); // Pass your credentials in a promise
    },
  },
});
```

We recommend setting the bucket to encrypted [using the AWS CLI.](https://github.com/refinery-labs/lunasec-monorepo/blob/master/js/demo-apps/packages/react-front-end/src/SimpleTokenizerExample.tsx)

Now just register the plugin with Express:

```typescript
const app = express();
lunaSec.simpleTokenizerBackend.register(app);
```

That's it! This will add `/.lunasec/tokenize` and `/.lunasec/detokenize` routes to your server.

## ClientSide
To create and read tokens in the browser, initialize the tokenizer and tell it where the backend is:
```typescript
const tokenizer = new SimpleTokenizer({
  host: window.location.origin,
});
```

Now you can tokenize and detokenize strings and buffers:

### Tokenize
```typescript
const result = await tokenizer.tokenize(e.target.value);

if (!result.success) {
  throw result.error; // Handle the error however you like
}

console.log('token is: ', result.tokenId)
```

### Detokenize
```typescript
const result = await tokenizer.detokenize(this.state.inputToken);

if (!result.success) {
  throw result.error;
}

console.log('Decoded value is ', result.value)
```

To see these in a more complete example inside a react app, check out [the relevant part of the demo app.](https://github.com/refinery-labs/lunasec-monorepo/blob/master/js/demo-apps/packages/react-front-end/src/SimpleTokenizerExample.tsx)

To see the API Reference for these libraries, take a look at [the TypeDoc TODO LINK HERE](./guide.md).