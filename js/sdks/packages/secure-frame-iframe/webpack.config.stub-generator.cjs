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
const conf = require('./webpack.config.cjs');
// const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

// conf.plugins.push(new EsmWebpackPlugin());

conf.output = {
  // library: "LIB",
  // libraryTarget: "var",
  // filename: 'iframeBundle.js',
  path: path.resolve(__dirname, 'stub'),
};

conf.plugins.push(new HtmlWebpackPlugin({
    inject: true,
    filename: 'raw-frame-contents.html'
    // template: path.resolve('public/index.html'),
  }),
  // Inlines chunks with `runtime` in the name
  new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/\.js/]),
)

// conf.target = 'node'

module.exports = conf;
