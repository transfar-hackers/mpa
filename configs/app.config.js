/*
 * filename: app.config.js
 * purpose: application level configurations
 * author: j-sparrow
 *
 */

const path = require('path')

module.exports = {
  srcPath: path.resolve(__dirname, '../src'),
  entryNames: ['index', 'mypage', 'contracts'], // per entry per html(used for html-webpack-plugin)
  entryPaths: ['index.js', 'index.js', 'index.js'], // per html page per entry(for webpack to generate dependency graph)
  outputRoot: path.resolve(__dirname, '../dist')
}
