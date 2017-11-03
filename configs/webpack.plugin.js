/*
 * filename: webpack.plugin.js
 * purpose: generate entries depending on app.config.js
 * author: j-sparrow
 *
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AppConfig = require('./app.config.js')
const MyPath = require('../utilities/path.js')

module.exports = {
  plugins: [
    ...MyPath.generatePlugins(AppConfig),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // name the bundle for common modules across different bundles
    })
  ]
};
