const webpack = require('webpack');

const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const buildMode = isProduction ? 'production': 'development';

const outputFile = isProduction ? 'main.js' : 'main-dev.js';

const runWatch = process.env.WEBPACK_WATCH !== undefined;

const developmentConfig = {
  plugins: [
    new webpack.DefinePlugin({
      __FRAME_HOST_URL__: '"http://localhost:5002/"'
    })
  ]
}

const productionConfig = {
  plugins: [
    new webpack.DefinePlugin({
      // TODO: Make this not dev
      __FRAME_HOST_URL__: '"http://localhost:5002/fake-url"'
    })
  ]
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  devtool: 'inline-source-map',
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
      use: 'ts-loader',
      exclude: /node_modules/
    }]
  },
  output: {
    filename: outputFile,
    path: path.resolve(__dirname, 'build/static/')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js']
  },
  ...(isProduction ? productionConfig : developmentConfig)
};
