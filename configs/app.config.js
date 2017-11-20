/*
 * filename: app.config.js
 * purpose: application level configurations
 * author: j-sparrow
 *
 */

const path = require('path')

module.exports = {
  srcPath: path.resolve(__dirname, '../src'),
  entryHTMLs: ['index', 'mypage', 'contracts', 'orderdetail', 'logisticOrders', 'orderManagement', 'purchaseOrders', 'contractsManagement'], // html file name(used for html-webpack-plugin)
  entryJS: ['index.js', 'index.js', 'index.js', 'index.js', 'index.js', 'index.js', 'index.js', 'index.js'], // per html page per entry(for webpack to generate dependency graph)
  outputRoot: path.resolve(__dirname, '../dist')
}
