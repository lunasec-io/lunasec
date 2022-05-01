---
id: "handling-files"
title: "Securing Files"
sidebar_label: "Securing Files"
sidebar_position: 6
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
## Secure File Handling

LunaDefend has several components for uploading and downloading files.  As with handling text, the data will be uploaded to
S3 and you'll receive a token.  

### Uploading a file
The `<SecureUploader>` element is a multi-file uploader component with a pre-built UI.  

```tsx
<SecureUpload
    id="drivers-license-upload"
    name="uploader"
    fileTokens={documents}
    onTokenChange={(tokens) => {
      setDocuments(tokens);
    }}
    errorHandler={(e) => setError(e.message)}
/>
```

When a file is done uploading `onTokenChange` will fire with the current array of file tokens.  Pass an array of already uploaded tokens to
`fileTokens` to pre-fill the UI, allowing users to edit an existing list of files.  Be aware that users will also be able to download any files
in the selector by clicking them. 

Here's a screenshot of the secure uploader:

![picture-of-secure-uploader](/img/secure-upload.png)

### Downloading a file 
`<SecureDownload>` embeds a link that, when clicked, downloads a file.  
```tsx
<SecureDownload token={fileToken} errorHandler={(e) => setError(e.message)} />
```

