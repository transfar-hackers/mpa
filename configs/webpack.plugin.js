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
    }),
    new AssetsFilterForHTML({
      options: AppConfig
    })
  ]
};

function AssetsFilterForHTML(options) {}
AssetsFilterForHTML.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      let htmlName = MyPath.removePostfix(htmlPluginData.outputName.split('/')[0])
      let upperAssetsJS = htmlPluginData.assets.js,
        upperAssetsCSS = htmlPluginData.assets.css,
        usefulJS = [],
        usefulCSS = [],
        commonJS = ''

      for (let i = 0; i < upperAssetsJS.length; i += 1) {
        if (upperAssetsJS[i].indexOf('common.js') !== -1) {
          commonJS = upperAssetsJS[i]
        }
      }
      // console.log(htmlPluginData.assets.js)
      for (let i = 0; i < upperAssetsJS.length; i += 1) {
        if (upperAssetsJS[i].indexOf(htmlName) !== -1) {
          usefulJS.push(upperAssetsJS[i])
        }
      }
      usefulJS.splice(0, 0, commonJS)
      htmlPluginData.assets.js = usefulJS

      for (let i = 0; i < upperAssetsCSS.length; i += 1) {
        if (upperAssetsCSS[i].indexOf(htmlName) !== -1) {
          usefulCSS.push(upperAssetsCSS[i])
        }
      }
      htmlPluginData.assets.css = usefulCSS

      callback(null, htmlPluginData)
    })
  })
}
