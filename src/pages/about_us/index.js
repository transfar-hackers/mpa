import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style.css'
import ToperComponent from 'components/ToperComponent'
import HeaderComponent from 'components/HeaderComponent'
import favicon from 'styles/images/favicon.ico'

$((function () {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)
    // end of add favicon

  // toper, header, and slider
  let $toper = $('.toper')
  let $header = $('.header')

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

})())
