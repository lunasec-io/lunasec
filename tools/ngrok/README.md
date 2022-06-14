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
# Using ngrok for testing LunaSec deployment

When testing a production build of the LunaSec stack with the demo app running locally, you must be able to access the 
demo app's backend remotely. To achieve this, you can use ngrok to make your local backend accessible to the internet via
ngrok.

To set this up, install ngrok:
```shell
yay -S ngrok
```

Copy the ngrok config in this directory to your home directory:
```shell
cp ngrok.yml ~/.ngrok2/ngrok.yml
```

Signup for ngrok [here](https://ngrok.com/) and copy the authtoken.

Setup your auth token:
```shell
ngrok authtoken <your authtoken>
```

To start ngrok, run:
```shell
ngrok start --all
```

Take the generated domain names and set then in your `lunadefend.js`:
```js
module.exports = {
  // ...
  production: {
    applicationFrontEnd: 'http://localhost:3000',
    authProviders: 
  },
}

```

Redeploy the LunaSec stack so the tokenizer knows how to access your now accessible backend.
```shell
lunasec deploy
```
