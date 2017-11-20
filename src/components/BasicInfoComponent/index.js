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
  let html = template(data ? data : {
    info: {
      name: 'jack sparrow',
      hobbies: 'adventure, and the ocean',
      gender: 'male'
    }
  })

  return html
}
