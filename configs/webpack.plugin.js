/*
 * filename: webpack.plugin.js
 * purpose: generate entries depending on app.config.js
 * author: j-sparrow
 */
const path = require('path')
const fs = require('fs')
const _ = require('lodash')
const colors = require('colors')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AppConfig = require('./app.config.js')
const MyPath = require('../src/utilities/path.js')

module.exports = {
  plugins: [
    ...MyPath.generatePlugins(AppConfig),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // name the bundle for common modules across different bundles
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.ProvidePlugin({
      lodash: 'lodash',
      jQuery: "jquery",
      "window.jQuery": "jquery",
      Proper: ['proper.js', 'default'],
      $: 'jquery',
      moment: 'moment',
      handlebars: 'handlebars'
    }),
    new webpack.DefinePlugin({
      appRoot: JSON.stringify(path.resolve(__dirname, '..'))
    }),
    new ExtractTextPlugin({
      filename: "[name]/[chunkhash][name].css",
      allChunks: true
    }),
    new AssetsFilterWebpackPlugin({ // custom plugin to filter irrelevant assets
      options: null
    }),
    new BuildCleanerWebpackPlugin({
      options: null
    })
  ]
};

/*
 * while generating assets(.js|.css files) and attach them to the html pages,
 * html-webpack-plugin attach all of them to each html file, which, is not what we
 * wanted.
 * we filter out the assets files which do not belong to the specific html file.
 * author: j-sparrow
 */
function AssetsFilterWebpackPlugin(options) {}
AssetsFilterWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
      let isWindows = htmlPluginData.outputName.indexOf('\\') !== -1
      let htmlName = ''
      let upperAssetsJS = htmlPluginData.assets.js,
        upperAssetsCSS = htmlPluginData.assets.css,
        usefulJS = [],
        usefulCSS = [],
        commonJS = ''

      if (!isWindows) {
        htmlName = MyPath.removePostfix(htmlPluginData.outputName.split('/')[0])
      } else {
        htmlName = MyPath.removePostfix(htmlPluginData.outputName.split(`\\`)[0])
      }

      for (let i = 0; i < upperAssetsJS.length; i += 1) {
        if (upperAssetsJS[i].indexOf('common.js') !== -1) {
          commonJS = upperAssetsJS[i]
        }
      }
      // console.log(htmlPluginData.assets.js)
      for (let i = 0; i < upperAssetsJS.length; i += 1) {
        // console.log(`htmlname: ${htmlName}, js name: ${upperAssetsJS[i]}`)
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

/*
 * In watch mode, any changes made will cause webpack to rebuild incrementally, and each rebuild
 * generates lots of extra files.
 * CleanWebpackPlugin is triggered only when webpack builds the whole project, so
 * here we need a cleaner whenever an incremental(partial) build is performed.
 * author: j-sparrow
 */
function BuildCleanerWebpackPlugin(options) {}
BuildCleanerWebpackPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function(compilation) {
    let existingFiles = MyPath.walkDirSyncFlat(path.resolve(__dirname, '../dist'))
    let newFiles = Object.keys(compilation.compilation.assets)
      // remove outdated output files
    console.log(`new files: ${newFiles}`)
    _.each(existingFiles, file => {
      var shortname = file.split('dist')[1].slice(1)
      var reg = /\.(woff|ttf|gif|svg|eot|html)$/ // (ignore .woff, .ttf, .gif, .svg, .eot files, they don't regrenerate)
        // console.log(`existing file: ${shortname}`)
      if (newFiles.indexOf(shortname.replace(`\\`, `/`)) === -1 &&
        (!reg.test(shortname))) {
        // file outdated, delete it
        fs.unlink(file, () => {
          console.log(`${file} is outdated and therefore deleted `)
          console.log(colors.yellow(`last build: ${new Date()}`))
        })

        console.log('incremental compilation done! please press F5 to refresh page')
      }
    })
  })
}
