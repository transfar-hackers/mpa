/*
 * filename: index.js
 * purpose: entry point of basicinfo component
 */

import './style.css'
var template = require('./BasicInformation.template')

module.exports = {
  render: render
}

function render(data) {
  let compiler = handlebars.compile(template)
  let html = compiler({
    info: {
      name: 'jack sparrow'
    }
  })
}
