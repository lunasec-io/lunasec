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
module.exports = {
    webpack: {
        target: "web",
        alias: {},
        configure: (webpackConfig, {env, paths}) => {
            webpackConfig.module.rules[1].oneOf.unshift(
                {
                    test: /\.css-style-sheet\.(scss|sass)$/,
                    use: [{
                        loader: require.resolve("css-loader"),
                        options: {
                            exportType: 'css-style-sheet'
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
    }

}
