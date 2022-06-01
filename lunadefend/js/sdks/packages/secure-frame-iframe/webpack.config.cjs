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
const webpack = require('webpack');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const envFile = isProduction ? '.env-prod' : '.env';

const buildMode = isProduction ? 'production': 'development';

const outputJsBundle = isProduction ? '[name].[contenthash].js' : 'main-dev.js';

const outputStaticFile = isProduction ? '[path][name].[contenthash][ext]' : '[path][name][ext]';

const runWatch = process.env.WEBPACK_WATCH !== undefined;

const plugins = [];

plugins.push(new CopyWebpackPlugin({
  patterns: [{from: 'static', to: `../${outputStaticFile}` }]
}));

plugins.push(new webpack.ProvidePlugin({
  events: require.resolve('events'),
  process: require.resolve('process/browser'),
  Buffer: [require.resolve('buffer'), 'Buffer'],
  url: require.resolve('url'),
}));

// if (isProduction) {
//   const S3Plugin = require('webpack-s3-plugin')
//   plugins.push(new S3Plugin({
//     // Exclude uploading of html
//     // exclude: /.*\.html$/,
//     directory: 'build/js',
//     // s3Options are required
//     s3Options: {
//       region: process.env.LUNASEC_ASSET_BUCKET_REGION || 'us-west-2'
//     },
//     s3UploadOptions: {
//       Bucket: process.env.LUNASEC_ASSET_BUCKET_NAME
//     },
//     cdnizerOptions: {
//       defaultCDNBase: process.env.LUNASEC_CDN_BASE_URL
//     }
//   }));
// }

module.exports = {
  context: path.resolve(__dirname, 'src/'),
  devtool: 'source-map',
  entry: './main.ts',
  mode: buildMode,
  watch: runWatch,
  watchOptions: {
    ignored: [
      path.resolve(__dirname, 'build/**'),
      path.resolve(__dirname, 'node_modules/**')
    ]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json',
          projectReferences: true
        }
      }],
      exclude: /node_modules/
    }]
  },
  output: {
    filename: outputJsBundle,
    path: path.resolve(__dirname, 'public/js/')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
    fallback: {
      events: require.resolve('events'),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer/"),
      url: require.resolve('url'),
    },
    symlinks: false
  },
  plugins
};
