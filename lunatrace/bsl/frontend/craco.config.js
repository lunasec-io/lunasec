/*
 * Copyright by LunaSec (owned by Refinery Labs, Inc)
 *
 * Licensed under the Business Source License v1.1 
 * (the "License"); you may not use this file except in compliance with the
 * License. You may obtain a copy of the License at
 *
 * https://github.com/lunasec-io/lunasec/blob/master/licenses/BSL-LunaTrace.txt
 *
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
const webpack = require('webpack')

module.exports = {
  webpack: {
    target: "web",
    alias: {},
    plugins: {
      add: [
        // These shims/polyfills are commented out because they aren't in use currently, but may be needed again if we bring in another module written for node.  Thanks to webpack 5 :(

        // new webpack.ProvidePlugin({
        //   process:'process/browser',
        //   Buffer: ['buffer', 'Buffer']
        // }),
]
      // This is the example code for Craco:
      // add: [], /* An array of plugins */
      // add: [
      //   plugin1,
      //   [plugin2, "append"],
      //   [plugin3, "prepend"], /* Specify if plugin should be appended or prepended */
      // ], /* An array of plugins */
      // remove: [],  /* An array of plugin constructor's names (i.e. "StyleLintPlugin", "ESLintWebpackPlugin" ) */
    },
    configure: { /* Any webpack configuration options: https://webpack.js.org/configuration */
      resolve: {
        fallback: {
          // process: require.resolve("process/browser"),
          // path: require.resolve("path-browserify"),
          // "crypto": require.resolve("crypto-browserify"),
          // "stream": require.resolve("stream-browserify"),
          // "assert": require.resolve("assert"),
          // "http": require.resolve("stream-http"),
          // "https": require.resolve("https-browserify"),
          // "os": require.resolve("os-browserify"),
          // "url": require.resolve("url")
        }
      },
      module: {
        rules: [
          {
            test: /\.m?js$/,
            resolve: {
              fullySpecified: false,
            }
          }
        ]
      }
      // configure: (webpackConfig, { env, paths }) => { return webpackConfig; }
    }
  }
}

