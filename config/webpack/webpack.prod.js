const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ngtools = require('@ngtools/webpack');

const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  //devtool: 'source-map',

  module: {
    rules: [
      {
        enforce: 'post',
        test: /\.ts$/,
        loaders: ['@ngtools/webpack'],
        exclude: [/\.(spec|e2e)\.ts$/]
      }
    ]
  },

  entry: {
    'app': './src/main-ngc.ts'
  },

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ngtools.AotPlugin({
      tsConfigPath: 'tsconfig-aot.json',
      typeCheck: false
    }),
    new webpack.NoErrorsPlugin(),

    // TODO: Webpack 2 issue https://github.com/webpack/webpack/issues/2644
    // new webpack.optimize.DedupePlugin(),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      //beautify: true // for debuging production builds
    }),
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [require('postcss-cssnext')],
        htmlLoader: {
          minimize: false // workaround for ng2
        }
      }
    }),
    new CopyWebpackPlugin([{
      from: 'src/public/_redirects',
      to: ''
    }]),
    /*
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$/,
        threshold: 10240,
        minRatio: 0.8
    })
    */
  ]
});
