const webpack = require('webpack');

const path = require('path');
const S3Plugin = require('webpack-s3-plugin')

const isProduction = process.env.NODE_ENV === 'production';

const envFile = isProduction ? '.env-prod' : '.env';

require('dotenv').config({
  path: path.resolve(process.cwd(), envFile)
});

const buildMode = isProduction ? 'production': 'development';

const outputFile = isProduction ? '[name].[contenthash].js' : 'main-dev.js';

const runWatch = process.env.WEBPACK_WATCH !== undefined;

const plugins = [];

if (isProduction) {
  plugins.push(new S3Plugin({
    // Exclude uploading of html
    // exclude: /.*\.html$/,
    directory: 'public/js',
    // s3Options are required
    s3Options: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.ESLUNA_ASSET_BUCKET_REGION || 'us-west-2'
    },
    s3UploadOptions: {
      Bucket: process.env.ESLUNA_ASSET_BUCKET_NAME
    },
    cdnizerOptions: {
      defaultCDNBase: process.env.ESLUNA_CDN_BASE_URL
    }
  }));
}

module.exports = {
  context: path.resolve(__dirname, 'src/'),
  devtool: 'inline-source-map',
  entry: './main.ts',
  mode: buildMode,
  watch: runWatch,
  watchOptions: {
    ignored: [
      path.resolve(__dirname, 'build/**'),
      path.resolve(__dirname, 'public/**'),
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
    filename: outputFile,
    path: path.resolve(__dirname, 'public/js/')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  plugins
};
