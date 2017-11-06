/*
 * filename: webpack.config.development.js
 * purpose: merge entry, output, module, and plugins with dev
 */

const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const webpack = require('webpack')
const entry = require('./webpack.entry.js')
const modules = require('./webpack.module.js')
const output = require('./webpack.output.js')
const plugin = require('./webpack.plugin.js')
const devConfig = {
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: { // this is for webpack-dev-server
    // contentBase: './dist',
    // hot: true,
    // port: 3000
  }
}

let config = merge(common, entry)
config = merge(config, modules)
config = merge(config, output)
config = merge(config, plugin)
config = merge(config, devConfig)

// console.log(config.module)

module.exports = config
