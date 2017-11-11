import 'babel-polyfill'
import './style.css'

const contractEditor = require('../../components/ContractComponent/index.js')

$(function(host) {
  contractEditor.init({
    selector: '.contractEditor',
    height: 200,
    width: 300,
    skin: false,
    // inline: true,
    plugins: 'advlist autolink link image imagetools lists charmap preview save autoresize',
    toolbar: 'undo redo | styleselect | bold italic | link image',
  })

}(window))
