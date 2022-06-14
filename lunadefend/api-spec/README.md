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
# API Spec
This folder contains the OpenAPI Spec for the LunaSec Tokenizer APIs.
You may use these files with any OpenAPI generator to generate a basic Tokenizer client for your language.

By default, any client that is generated from these sources will be missing functionality as these 
APIs do not incorporate all the functionality provided by the LunaSec Tokenizer SDK.
Functionality like automatically uploading tokenization data to S3 is unable to be generated directly from
an OpenAPI spec, and that must be implemented by your application code.

That said, we have built LunaSec to use OpenAPI to make adding new language support easy. You can use our Javascript
Tokenizer SDK as an example to implement the additional S3 calls to any new language you wish to add support for.

If you add support for an additional language, please share it with us in a Pull Request or in our GitHub Discussions.

Thank you!

## Caveats
Some endpoints may only exist in the "LunaSec Enterprise" version and will only work when used with the 
LunaSec Enterprise Tokenizer running on the backend. We've still made the OpenAPI spec open source in order to 
encourage creation and adoption of LunaSec across many languages.

## License
All files in this folder are licensed under the Apache 2.0 license, unless otherwise specified in the file.

