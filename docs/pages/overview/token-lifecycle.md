---
id: "token-lifecycle"
title: "What are Tokens?"
sidebar_label: "What are Tokens?"
sidebar_position: 4
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

Simply put, Tokens are identifiers similar to a foreign key in a database. They're random values, and they have no meaning
by themselves. In order to turn a Token into anything useful, you must pass it to LunaSec where it undergoes the process
of "Detokenization", only then, is it converted back into the original data.

This is useful because it prevents any _single point of failure_ from resulting in your data leaking. Even if an attacker 
dumps your entire database by leveraging an [SQL Injection attack](https://owasp.org/www-community/attacks/SQL_Injection), 
finds an [exposed database backup](https://techcrunch.com/2019/04/03/facebook-records-exposed-server/), or grabs Tokens 
via another attack vector, that attacker _still_ has to be able to Detokenize them.

By implementing security controls at the time that Detokenization happens, you are able to monitor, detect, and thwart
an attack that would otherwise leak your data. You can see the features that LunaSec provides you for more context about
how we use Tokenization to protect your app against the most common security issues.

### Go try it out! 

If you want to see Detokenization in a real world scenario, you're welcome to check out our 
[Live Demo](https://app.lunasec.dev). Just
open up your Network Inspector to see the requests happening. The rest of this document will explain the process in more
detail to help you better understand what's happening.

### How does Detokenization work?

It's a multi-part process with the way that LunaSec is implemented. The service responsible for dealing with Tokens in
LunaSec is aptly named the "Tokenizer". By itself, the Tokenizer doesn't actually store data associated with Tokens.
It just processes Tokens and then hands back information about where to download (and decrypt) the Token from AWS S3.

We use AWS S3 because it's fast, scales really well, stores files [up to 5TB](https://docs.aws.amazon.com/AmazonS3/latest/userguide/qfacts.html),
and there are a [dozen](https://github.com/topics/s3-storage) of 
[high-quality](https://github.com/minio/minio) [backends](https://github.com/juicedata/juicefs)
[that](https://www.backblaze.com/b2/docs/s3_compatible_api.html)
[support](https://github.com/chrislusf/seaweedfs/wiki/Amazon-S3-API) the same API as S3 to cover any needs.

#### High-Level Steps
1. The Client makes a POST request with the Token is made to the Tokenizer's `/detokenize` API,
2. The Tokenizer validates the request (checks Auth, if the Token exists, etc.),
3. If approved, the Tokenizer returns an AWS S3 [pre-signed URL](https://docs.aws.amazon.com/AmazonS3/latest/userguide/ShareObjectPreSignedURL.html) to download the data,
4. The Client makes a GET request to the AWS S3 URL in the request (along with encryption key),
5. AWS S3 sends back the decrypted data.

_In reality, there is more to it than that. There's a key generation step, a bunch of Authorization checks via Grants or
Secure Authorizers, and some CORS requests. Those are mostly implementation details though. See the Advanced section for
a deeper dive._

#### Detokenization HTTP Request Flow 

##### Request to Tokenizer
```http request
POST /detokenize HTTP/1.1
Host: tokenizer.lunasec.dev
Accept: application/json
Content-Type: application/json
Content-Length: 58
Origin: https://tokenizer.lunasec.dev
Cookie: access_token=<session_cookie>
```

**Uploaded JSON**:
```json
{
   "tokenId": "lunasec-2b58d9b2-83c1-4e9b-9692-b149112810c8"
}
```

##### Response from Tokenizer
```http request 
HTTP/1.1 200 OK
content-type: application/json
lunasec-session-hash: 1ca24299df038ec214bbf2ccb88b2ae6315560bd
vary: Origin
content-encoding: br
```

**Response JSON**
```json
{
   "success": true,
   "error": {},
   "data": {
      "downloadUrl": "https://<AWS_S3_URL>/a-very-long-url-very-secure-url
      "headers": {
         "host": "lunasec-ciphertextbucket<RANDOM_BUCKET_ID>.s3.us-west-2.amazonaws.com",
         "x-amz-server-side-encryption-customer-algorithm": "AES256",
         "x-amz-server-side-encryption-customer-key": "slwQy2d51/WSoPu9h8Fp5PJZ44w+x0VTcwr5dDnq3fI=",
         "x-amz-server-side-encryption-customer-key-md5": "GkNtl6TYapPdZLbE9ZhR7Q=="
      }
   }
}
```

##### Request to AWS S3
```http request
GET /a-very-long-url-very-secure-url
Host: lunasec-ciphertextbucket<RANDOM_BUCKET_ID>.s3.us-west-2.amazonaws.com
Accept: application/json, text/plain, */*
x-amz-server-side-encryption-customer-algorithm: AES256
x-amz-server-side-encryption-customer-key: slwQy2d51/WSoPu9h8Fp5PJZ44w+x0VTcwr5dDnq3fI=
x-amz-server-side-encryption-customer-key-md5: GkNtl6TYapPdZLbE9ZhR7Q==
Origin: https://tokenizer.lunasec.dev
```

**Response (Detokenized Data)**
```text
some-super-secret-data
```

And that's it! You can store anything in the data that's uploaded. It's really just a key-value store with some fancy
security magic sprinkled into it. The rest of the LunaSec stack is where we continue bolting on [layers of security](./security/levels.md).

If you'd like to learn more about how the LunaSec Secure Components work in your browser, we have that info 
[here](./advanced/how-secure-components-work.md).
