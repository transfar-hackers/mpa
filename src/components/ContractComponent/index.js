/*
 * filename: index.js
 * purpose: entry point of contract component
 */

import './style.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'
// import 'tinymce/skins'

// Tinymce Plugins
import 'tinymce/plugins/paste/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/autoresize/plugin'

const template = require('./Contract.template')

module.exports = {
  render: render,
  editorId: '#'
}

function render(data) {
  let html = template({
    info: {
      name: 'jack sparrow',
      gender: 'female'
    }
  })

  console.log(`I'm doing rendering`)


  tinymce.init({
    selector: 'textarea',
    height: 500,
    // skin: false,
    plugins: ['paste', 'link', 'autoresize']
  })

  return html
}
