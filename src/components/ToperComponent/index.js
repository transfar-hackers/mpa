/*
 * filename: index.js
 * purpose: entry point of Toper component
 * author: j-sparrow
 */

import './style.css'
var template = require('./Toper.template')

module.exports = {
  render: render
}

function render(data, $element) {
  let html = template(data ? data : {
    message: '您好！欢迎访问武汉麦念科技有限公司官网！',
    topers: [{
      url: 'http://www.baidu.com',
      name: '收藏麦念'
    }, {
      url: 'http://www.baidu.com',
      name: '常见问题'
    }, {
      url: 'http://www.baidu.com',
      name: '关于麦念'
    }]
  })

  // console.log('toper: ', html)
  $element.html(html)
}
