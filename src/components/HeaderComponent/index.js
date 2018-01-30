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
    // bind event
  $('.header').on('click', function () {
    window.location.href = '../index/index.html';
  })

  $element.html(html)
}
