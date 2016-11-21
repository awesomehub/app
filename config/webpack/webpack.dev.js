const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: 'awesome-typescript-loader',
        query: {
          forkChecker: true
        },
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          'angular2-template-loader',
          '@angularclass/hmr-loader'
        ],
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          'angular2-router-loader?loader=system&genDir=src/app/compiled/src/app&aot=0'
        ],
        exclude: [
          /node_modules/
        ]
      }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new CopyWebpackPlugin([{
      from: 'src/public/assets/data',
      to: 'assets/data'
    }]),
  ],

  devServer: {
    hot: true,
    contentBase: './src/public',
    historyApiFallback: true,
    stats: 'minimal'
  }
});
