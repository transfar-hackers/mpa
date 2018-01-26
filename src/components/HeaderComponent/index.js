/*
 * filename: index.js
 * purpose: entry point of Header component
 * author: j-sparrow
 */

import './style.css'
var template = require('./Header.template')

module.exports = {
  render: render
}

function render($element) {
  let html = template()

  $element.html(html)
}
