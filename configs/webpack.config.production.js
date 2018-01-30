/*
 * filename: webpack.config.production.js
 * purpose: merge entry, output, module, and plugins with for production
 */
const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')
const entry = require('./webpack.entry.js')
const modules = require('./webpack.module.js')
const output = require('./webpack.output.js')
const plugin = require('./webpack.plugin.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const prodConfig = {
  plugins: [
    new UglifyJSPlugin(),
  ]
}

let config = merge(common, entry)
config = merge(config, modules)
config = merge(config, output)
config = merge(config, plugin)
config = merge(config, prodConfig)

module.exports = config
