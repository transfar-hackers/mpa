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
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const args = require('yargs').argv

const AppConfig = require('./app.config.js')
const BuildHelper = require('../src/utilities/build.helper.js')

// console.log(`args: `, args)

module.exports = {
  plugins: [
    ...BuildHelper.generatePlugins(AppConfig),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // name the bundle for common modules across different bundles
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../'),
      exclude: ['vendor']
    }),
    new webpack.ProvidePlugin({
      //lodash: 'lodash',
      //jQuery: 'jquery',
      //'window.jQuery': 'jquery',
      //Proper: ['proper.js', 'default'],
      //$: 'jquery',
      //moment: 'moment',
      //handlebars: 'handlebars'
    }),
    new webpack.DefinePlugin({
      appRoot: JSON.stringify(path.resolve(__dirname, '..')),
      bProd: args.env === 'production' ? true : false
    }),
    new ExtractTextPlugin({
      filename: '[name]/[chunkhash][name].css',
      allChunks: true
    }),
    new AssetsFilterWebpackPlugin({ // custom plugin to filter irrelevant assets
      options: null
    }),
    new BuildCleanerWebpackPlugin({
      options: null
    }),
    new CopyWebpackPlugin([{
      from: 'src/styles/images',
      to: 'styles/images'
    }, {
      from: 'node_modules/bootstrap',
      to: 'vendor/bootstrap'
    }, {
      from: 'node_modules/jquery',
      to: 'vendor/jquery'
    }, {
      from: 'node_modules/lodash',
      to: 'vendor/lodash'
    }, {
      from: 'node_modules/moment',
      to: 'vendor/moment'
    }, {
      from: 'node_modules/tinymce',
      to: 'vendor/tinymce'
    }])
    /*,
        new webpack.DllReferencePlugin({
          context: '.',
          manifest: require('../dist/vendor/vendor_manifest.json')
        })*/
  ]
}

/*
 * while generating assets(.js|.css files) and attach them to the html pages,
 * html-webpack-plugin attach all of them to each html file, which, is not what we
 * wanted.
 * we filter out the assets files which do not belong to the specific html file.
 * author: j-sparrow
 */
function AssetsFilterWebpackPlugin() {}
AssetsFilterWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-before-html-processing', function (htmlPluginData, callback) {
      let isWindows = htmlPluginData.outputName.indexOf('\\') !== -1
      let htmlName = ''
      let upperAssetsJS = htmlPluginData.assets.js,
        upperAssetsCSS = htmlPluginData.assets.css,
        usefulJS = [],
        usefulCSS = [],
        commonJS = ''

      if (!isWindows) {
        htmlName = BuildHelper.removePostfix(htmlPluginData.outputName.split('/')[0])
      } else {
        htmlName = BuildHelper.removePostfix(htmlPluginData.outputName.split('\\')[0])
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
        if (upperAssetsCSS[i].indexOf(htmlName) !== -1 || upperAssetsCSS[i].indexOf('common') !== -1) {
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
function BuildCleanerWebpackPlugin() {}
BuildCleanerWebpackPlugin.prototype.apply = function (compiler) {
  compiler.plugin('done', function (compilation) {
    let existingFiles = BuildHelper.walkDirSyncFlat(path.resolve(__dirname, '../dist'))
    let newFiles = Object.keys(compilation.compilation.assets)
      // remove outdated output files
      // console.log(`\nnew files: ${newFiles}`)
    _.each(existingFiles, file => {
      var shortname = file.split('dist')[1].slice(1)
      var reg = /\.(woff|woff2|ttf|gif|svg|eot|html|jpg|png)$/ // (ignore .woff, .ttf, .gif, .svg, .eot files, they don't regrenerate)
        // console.log(`existing file: ${shortname}`)
      if (newFiles.indexOf(shortname.replace('\\', '/')) === -1 && // not new files
        shortname.indexOf('vendor') === -1 && // nor vendor files
        (!reg.test(shortname))) { // nor woff|tff... files
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
