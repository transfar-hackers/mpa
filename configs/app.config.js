/*
 * filename: app.config.js
 * purpose: application level configurations
 * author: j-sparrow
 *
 */

const path = require('path')

module.exports = {
  srcPath: path.resolve(__dirname, '../src'),
  entryNames: ['index', 'mypage'],
  entryPaths: ['../src/pages/index/index.js', '../src/pages/mypage/index.js'],
  outputRoot: path.resolve(__dirname, '../dist')
}
