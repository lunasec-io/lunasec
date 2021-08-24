
const { Configuration, DefinePlugin} =require('webpack')
const { WebpackManifestPlugin}  = require('webpack-manifest-plugin')
const cssnano = require('cssnano')
//@ts-ignore

const {clientEntry, exampleApplication, tokenizerType} = require('./app-lookup');

const {IS_DEV, SERVER_PORT, WEBPACK_PORT} = require('./src/server/config');

const plugins = [
  new WebpackManifestPlugin({}),
  new DefinePlugin({
    ['TOKENIZER_TYPE']: JSON.stringify(tokenizerType),
    ['EXAMPLE_APPLICATION_NAME']: JSON.stringify(exampleApplication)
  })
];


const targets = IS_DEV ? { chrome: '79', firefox: '72' } : '> 0.25%, not dead';
console.log('THE GENERATED PATH IS ', path.join(__dirname, 'dist', 'statics'))

const config = {
  mode: IS_DEV ? 'development' : 'production',
  devtool: IS_DEV ? 'inline-source-map' : false,
  entry: [clientEntry],
// @ts-ignore
  devServer: {
    port: WEBPACK_PORT,
    overlay: IS_DEV,
    open: IS_DEV,
    openPage: `http://localhost:${SERVER_PORT}`,
  },
  output: {
    path: 'dist/statics',
    filename: `[name]-[chunkhash]-bundle.js`,
    chunkFilename: '[name]-[chunkhash]-bundle.js',
    publicPath: '/statics/',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  optimization: {
    minimize: !IS_DEV,
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 10,
        },
        material: {
          test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
          name: 'material-ui',
          chunks: 'all',
          priority: 20,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/env', { modules: false, targets }], '@babel/react', '@babel/typescript'],
            plugins: [
              '@babel/proposal-numeric-separator',
              '@babel/plugin-transform-runtime',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: false }],
              '@babel/plugin-proposal-object-rest-spread',
            ],
          },
        },
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localsConvention: 'camelCase',
              sourceMap: IS_DEV,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: IS_DEV,
              plugins: IS_DEV ? [cssnano()] : [],
            },
          },
        ],
      },
      {
        test: /.jpe?g$|.gif$|.png$|.svg$|.woff$|.woff2$|.ttf$|.eot$/,
        use: 'url-loader?limit=10000',
      },
    ],
  },
  plugins,
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
};

module.exports = config;
