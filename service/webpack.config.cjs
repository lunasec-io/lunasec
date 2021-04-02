const webpack = require('webpack');

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const buildMode = isProduction ? 'production': 'development';

const outputFile = isProduction ? 'main.js' : 'main-dev.js';

const runWatch = process.env.WEBPACK_WATCH !== undefined;

module.exports = {
  context: path.resolve(__dirname, 'src/browser'),
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
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'public/js/')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  }
};
