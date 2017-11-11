/*
 * filename: index.js
 * purpose: entry point of basicinfo component
 * author: j-sparrow
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
