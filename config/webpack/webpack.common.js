const env = require('dotenv').config({ silent: true });
const webpack = require('webpack');
const path = require('path');
const _ = require('lodash');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const helpers = require('./helpers');
const constants = require('./constants');

const isProd = process.env.npm_lifecycle_event === 'build';
env.APP_ENV = isProd ? 'production' : 'development';
const envMap = _.mapValues(env, v => JSON.stringify(v));

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts']
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'angular2-router-loader?loader=system&genDir=src/app/compiled/src/app&aot=' + isProd
        ],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: helpers.root('src', 'public')
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin
          .extract({
              fallbackLoader: "style-loader",
              loader: ['css-loader' + (isProd ? '?minimize' : ''), 'postcss-loader']
          })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw-loader!postcss-loader'
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new webpack.DefinePlugin({
      'ENV': envMap
    }),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      constants.CONTEXT_REPLACE_REGEX,
      helpers.root('./src') // location of your src
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      favicon: 'src/public/favicon.ico',
      template: 'src/public/index.html',
      chunksSortMode: 'dependency'
    }),

    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('postcss-cssnext')],
        tslint: {
          emitError: false,
          failOnHint: false
        }
      }
    }),

    // Ignore all optional deps of moment.js
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
};
