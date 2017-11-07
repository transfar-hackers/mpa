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
  let html = template({
    info: {
      name: 'jack sparrow',
      gender: 'female'
    }
  })

  return html
}
