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
      // compilation.plugin('html-webpack-plugin-alter-asset-tags', function(htmlPluginData, callback) {
      console.log('html-webpack-plugin-before-html-processing')
        // console.log('html-webpack-plugin-alter-asset-tags')
        // filter inrevelent assets, assume [name].html --> [name].js --> [name].css
        // console.log(htmlPluginData.plugin)
      let htmlName = MyPath.removePostfix(htmlPluginData.outputName.split('/')[0])
        //console.log(`html name: ${htmlName}`)
        /*
      let assets = JSON.parse(htmlPluginData.plugin.assetJson)
      let usefulAssets = []
        //console.log(`assets before: `)
        //console.log(assets)
      let reg = /\.(js|css)$/
      for (let i = 0; i < assets.length; i += 1) {
        //console.log(`asset: ${assets[i]} and html: ${htmlName}`)
        if (reg.test(assets[i])) {
          if (assets[i].indexOf(htmlName) !== -1) {
            usefulAssets.push(assets[i])
          }
        }
      }*/

      let upperAssetsJS = htmlPluginData.assets.js,
        upperAssetsCSS = htmlPluginData.assets.css,
        usefulJS = [],
        usefulCSS = []

      for (let i = 0; i < upperAssetsJS.length; i += 1) {
        if (upperAssetsJS[i].indexOf(htmlName) !== -1) {
          usefulJS.push(upperAssetsJS[i])
        }
      }
      htmlPluginData.assets.js = usefulJS

      for (let i = 0; i < upperAssetsCSS.length; i += 1) {
        if (upperAssetsCSS[i].indexOf(htmlName) !== -1) {
          usefulCSS.push(upperAssetsCSS[i])
        }
      }
      htmlPluginData.assets.css = usefulCSS

      //console.log(`assets after: `)
      //console.log(usefulAssets)
      // htmlPluginData.plugin.assetJson = JSON.stringify(usefulAssets)
      console.log(htmlPluginData)
      callback(null, htmlPluginData)
    })
  })
}
