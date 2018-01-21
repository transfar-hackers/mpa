import 'babel-polyfill'
import './style.css'
import SliderComponent from 'components/SliderComponent'

const favicon = require('styles/images/favicon.ico')

$((function () {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)

  // end of add favicon

  // slider
  let $slider = $('.slider')
  SliderComponent.render($slider)

})())
