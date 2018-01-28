import 'babel-polyfill'
import './style.css'
import ToperComponent from 'components/ToperComponent'
import HeaderComponent from 'components/HeaderComponent'
import SliderComponent from 'components/SliderComponent'
import favicon from 'styles/images/favicon.ico'

$((function () {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)

  // end of add favicon

  // toper, header, and slider
  let $toper = $('.toper')
  let $slider = $('.slider')
  let $header = $('.header')

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
  let toper = {
    message: '您好！欢迎访问武汉麦念科技有限公司官网！',
    topers: [{
      url: 'http://www.baidu.com',
      name: '收藏麦念'
    }, {
      url: 'http://www.baidu.com',
      name: '| 常见问题'
    }, {
      url: 'http://www.baidu.com',
      name: '| 关于麦念'
    }]
  }

  ToperComponent.render(toper, $toper)
  HeaderComponent.render($header)
  SliderComponent.render(sliders, $slider)

})())
