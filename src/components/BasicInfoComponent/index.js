/*
 * filename: index.js
 * purpose: entry point of basicinfo component
 */

import './style.css'

var template = `<div>
<div><span>Name:</span><input type='text' /></div>
<div><span>Gender:</span><input type='text' /></div>
<div><span>Gender:</span><span>{{info.name}}<</div>
<div><span>Gender:</span><span>{{info.gender}}<</div>
</div>`

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
