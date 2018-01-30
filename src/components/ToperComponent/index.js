/*
 * filename: index.js
 * purpose: entry point of Toper component
 * author: j-sparrow
 */

require('./style.css')
var template = require('./Toper.template')

module.exports = {
  render: render
}

function render(data, $element) {
  let html = template(data)
  $element.html(html)
}
