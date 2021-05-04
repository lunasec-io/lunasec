const webpack = require('webpack');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin')

const isProduction = process.env.NODE_ENV === 'production';

const envFile = isProduction ? '.env-prod' : '.env';

require('dotenv').config({
  path: path.resolve(process.cwd(), envFile)
});

const buildMode = isProduction ? 'production': 'development';

const outputJsBundle = isProduction ? '[name].[contenthash].js' : 'main-dev.js';

const outputStaticFile = isProduction ? '[path][name].[contenthash][ext]' : '[path][name][ext]';

const runWatch = process.env.WEBPACK_WATCH !== undefined;

const plugins = [];

plugins.push(new CopyWebpackPlugin({
  patterns: [{from: 'static', to: `../${outputStaticFile}` }]
}));

if (isProduction) {
  plugins.push(new S3Plugin({
    // Exclude uploading of html
    // exclude: /.*\.html$/,
    directory: 'build/js',
    // s3Options are required
    s3Options: {
      region: process.env.LUNASEC_ASSET_BUCKET_REGION || 'us-west-2'
    },
    s3UploadOptions: {
      Bucket: process.env.LUNASEC_ASSET_BUCKET_NAME
    },
    cdnizerOptions: {
      defaultCDNBase: process.env.LUNASEC_CDN_BASE_URL
    }
  }));
}

module.exports = {
  context: path.resolve(__dirname, 'src/'),
  devtool: 'eval-source-map',
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
          projectReferences: true,
          sourceMap: true,
          devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map'
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
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins
};
