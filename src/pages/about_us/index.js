import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
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
  let $header = $('.header')
  let $slider = $('.slider')

  let sliders = [{
    url: '../styles/images/sliders/slider-i-01.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '专家团队筹划',
    description: '专家团队筹划，制定系统方案，无死角精准节税',
    active: true
  }, {
    url: '../styles/images/sliders/slider-i-03.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '创先进企业',
    description: '创先进企业，享百万补贴，助企业腾飞'
  }, {
    url: '../styles/images/sliders/slider-i-04.jpg',
    alt: '武汉麦念科技信息有限公司',
    title: '一站式服务',
    description: '注册，代帐，网站，一站式服务'
  }]
  let toper = {
    message: '您好！欢迎访问武汉麦念科技有限公司官网！',
    topers: [{
      url: '../index.html',
      name: '返回首页'
    }, {
      url: '../about_us/index.html',
      name: '| 收藏麦念'
    }, {
      url: '../about_us/index.html',
      name: '| 最新政策'
    }, {
      url: '../about_us/index.html',
      name: '| 关于麦念'
    }]
  }

  SliderComponent.render(sliders, $slider)
  ToperComponent.render(toper, $toper)
  HeaderComponent.render($header)

})())
