/*
 * filename: webpack.output.js
 * purpose: generate output depending on app.config.js
 * author: j-sparrow
 *
 */

const path = require('path')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/[hash][name].js'
  }
}
