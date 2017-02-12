'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const moment = require('moment');
const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRev = new GitRevisionPlugin({
  versionCommand: 'describe --always --tags --dirty'
});

module.exports = {
  // The entry file. All your app roots from here.
  entry: [
    path.join(__dirname, 'app/index.js')
  ],
  // Where you want the output to go
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]-[hash].min.js.gz'
  },
  plugins: [
    // webpack gives your modules and chunks ids to identify them. Webpack can vary the
    // distribution of the ids to get the smallest id length for often used ids with
    // this plugin
    new webpack.optimize.OccurenceOrderPlugin(),

    // handles creating an index.html file and injecting assets. necessary because assets
    // change name because the hash part changes. We want hash name changes to bust cache
    // on client browsers.
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
      baseUrl: '/dominion-ui',
      date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
      version: require("./package.json").version,
      hash: gitRev.version()
    }),
    // extracts the css from the js files and puts them on a separate .css file. this is for
    // performance and is used in prod environments. Styles load faster on their own .css
    // file as they dont have to wait for the JS to load.
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    // plugin for passing in data to the js, like what NODE_ENV we are in.
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.BASE_URL': '/dominion-ui'
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ],

  // ESLint options
  eslint: {
    configFile: '.eslintrc',
    failOnWarning: false,
    failOnError: true
  },

  module: {
    noParse: /node_modules\/localForage\/dist\/localforage.js/,
    // Runs before loaders
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    // loaders handle the assets, like transforming sass to css or jsx to js.
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.scss$/,
      // we extract the styles into their own .css file instead of having
      // them inside the js.
      loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
    }, {
      test: /\.css$/,
      loader: 'style!css?modules&localIdentName=[name]---[local]---[hash:base64:5]'
    },
      {
        test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg|png|ico)(\?[a-z0-9#=&.]+)?$/,
        loader: 'file'
      }]
  },
  postcss: [
    require('autoprefixer')
  ]
};
