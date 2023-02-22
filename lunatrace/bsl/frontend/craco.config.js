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
const {getLoader, loaderByName, removeLoaders} = require("@craco/craco");
// const { inspectConfigPlugin } = require('craco-plugin-inspect-config'); // seems broken, it would be extremely helpful
const util = require('util')
module.exports = {
    // plugins: [
    //   // ... put it last
    //   {
    //     plugin: inspectConfigPlugin,
    //     options: {
    //       enabled: true,
    //     },
    //   },
    // ],
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
        configure: (webpackConfig, {env, paths}) => {

            webpackConfig.module.rules[1].oneOf.unshift(
                {
                    test: /\.css-style-sheet\.(scss|sass)$/,
                    use: [{
                        loader: require.resolve("css-loader"),
                        options: {
                            exportType: 'css-style-sheet'
                            // postcssOptions: {
                            //   plugins: [require("autoprefixer")],
                            // },
                        },
                    }, {
                        loader: require.resolve('postcss-loader'),
                        options: {
                            postcssOptions: {
                                ident: 'postcss',
                                config: false,
                                plugins: [
                                    'postcss-flexbugs-fixes',
                                    [
                                        'postcss-preset-env',
                                        {autoprefixer: {flexbox: 'no-2009'}, stage: 3}
                                    ],
                                    'postcss-normalize'
                                ]
                            },
                            sourceMap: true
                        }
                    }, 'sass-loader']
                });
            return webpackConfig;
        },
        // module: {
        //   rules: [
        //     {
        //       test: /\.m?js$/,
        //       resolve: {
        //         fullySpecified: false,
        //       }
        //     }
        //   ]
        // }
        // configure: (webpackConfig, { env, paths }) => { return webpackConfig; }

    }

}
