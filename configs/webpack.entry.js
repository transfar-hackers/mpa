/*
 * filename: webpack.entry.js
 * purpose: generate entries depending on app.config.js
 * author: j-sparrow
 *
 */
const path = require('path')
const AppConfig = require('./app.config.js')
const MyPath = require('../src/utilities/path.js')

module.exports = {
  entry: MyPath.getEntries(AppConfig)
}
