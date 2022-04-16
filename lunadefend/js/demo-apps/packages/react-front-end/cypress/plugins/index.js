/*
 * Copyright 2021 by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  const options = {
    printLogsToConsole: process.env.VERBOSE_CYPRESS_LOGS === "always" ? 'always' : 'onFail'
  }

  require('cypress-terminal-report/src/installLogsPrinter')(on, options);

  on('before:browser:launch', (browser = {}, launchOptions) => {
    // if (browser.family === 'chromium' && browser.name !== 'electron') {
    // auto open devtools
    launchOptions.args.push('--auto-open-devtools-for-tabs');
    launchOptions.args.push('--unsafely-treat-insecure-origin-as-secure=http://tokenizer-backend:37766,http://application-back-end:3001,http://application-back-end:3002');
    launchOptions.args.push('--disable-features=SameSiteByDefaultCookies');
    launchOptions.args.push('--window-size=1440,900');
    launchOptions.args.push('--force-device-scale-factor=1');

    // }

    // if (browser.family === 'firefox') {
    //     // auto open devtools
    //     launchOptions.args.push('-devtools')
    // }
    //
    // if (browser.name === 'electron') {
    //     // auto open devtools
    //     launchOptions.preferences.devTools = true
    // }

    // `args` is an array of all the arguments that will
    // be passed to browsers when it launches
    if (process.env.VERBOSE_CYPRESS_LOGS === "always") {
      console.log(launchOptions.args) // print all current args
    }
    // whatever you return here becomes the launchOptions
    return launchOptions
  })
  on('task', {
    log: function (message) {
      console.log(JSON.stringify(message, null, 2));
      return null
    }
  })
}
