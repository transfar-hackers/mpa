/*
 * filename: webpack.entry.js
 * purpose: generate entries depending on app.config.js
 * author: j-sparrow
 *
 */
const AppConfig = require('./app.config.js')
const BuildHelper = require('../src/utilities/build.helper.js')

module.exports = {
  entry: BuildHelper.getEntries(AppConfig)
}
