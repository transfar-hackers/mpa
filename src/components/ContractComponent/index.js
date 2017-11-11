/*
 * filename: index.js
 * purpose: entry point of contract component
 */

import './style.css'
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/skins/lightgray/skin.min.css'
import 'tinymce/skins/lightgray/content.min.css'

// Tinymce Plugins
import 'tinymce/plugins/advlist/plugin'
import 'tinymce/plugins/autolink/plugin'
import 'tinymce/plugins/link/plugin'
import 'tinymce/plugins/imagetools/plugin'
import 'tinymce/plugins/image/plugin'
import 'tinymce/plugins/lists/plugin'
import 'tinymce/plugins/charmap/plugin'
import 'tinymce/plugins/paste/plugin'
import 'tinymce/plugins/print/plugin'
import 'tinymce/plugins/preview/plugin'
import 'tinymce/plugins/save/plugin'
import 'tinymce/plugins/autoresize/plugin'

// language package
import './zh_CN.js'

// const template = require('./Contract.template')

module.exports = tinymce

/*
function render(data) {
  let html = template({
    info: {
      name: 'jack sparrow',
      gender: 'male'
    }
  })

  tinymce.init({
    // selector: '#contractEditor',
    target: $(html)[0],
    height: 200,
    skin: false,
    // inline: true,
    plugins: 'advlist autolink link image imagetools lists charmap preview save autoresize',
    toolbar: 'undo redo | styleselect | bold italic | link image',
  })

  return html
}
*/
