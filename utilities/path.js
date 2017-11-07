/*
 * filename: path.js
 * purpose: resolve path related problems, base on application level
 *   configurations(app.config.js)
 * author: j-sparrow
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// get output path of .html pages from entry path of .hbs files
function calculateHtmlOutpath(inpath) {
  let outpath = ''
  outpath = path.resolve(__dirname, `${inpath.replace('../src', '../dist').replace('.js', '.html').replace('/pages', '')}`)

  return outpath
}

function getEntries(config) {
  var i = 0,
    len = config.entryPaths.length,
    entries = {}

  for (i = 0; i < len; i += 1) {
    entries[config.entryNames[i]] = path.resolve(__dirname, config.entryPaths[i])
  }

  return entries
}

// generate plugins depending on AppConfig
function generatePlugins(config) {
  var i = 0,
    len = config.entryPaths.length,
    plugins = []

  for (i = 0; i < len; i += 1) {
    let template = config.entryPaths[i]
    let len = template.length
    plugins.push(new HtmlWebpackPlugin({
      template: path.resolve(__dirname, template.replace('.js', '.html')),
      filename: `${calculateHtmlOutpath(template)}` // remove .hbs postfix
    }))
  }

  return plugins
}

function removePostfix(fullname) {
  // console.log(fullname)
  return fullname.split('.')[0]
}

module.exports = {
  calculateHtmlOutpath: calculateHtmlOutpath,
  getEntries: getEntries,
  generatePlugins: generatePlugins,
  removePostfix: removePostfix
}
