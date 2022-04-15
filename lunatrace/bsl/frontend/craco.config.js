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
        new webpack.ProvidePlugin({
          process:'process/browser'
        })
      ]
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
          process: require.resolve("process/browser")
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

