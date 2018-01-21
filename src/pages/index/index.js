import 'babel-polyfill'
import './style.css'
import SliderComponent from 'components/SliderComponent'
import favicon from 'styles/images/favicon.ico'

$((function () {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)

  // end of add favicon

  // slider
  let $slider = $('.slider')
  let sliders = [{
    url: '../styles/images/sliders/slider1.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '',
    description: '',
    active: true
  }, {
    url: '../styles/images/sliders/slider2.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '',
    description: ''
  }, {
    url: '../styles/images/sliders/slider3.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '',
    description: ''
  }]

  SliderComponent.render($slider, sliders)

})())
