import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const orders = require('utilities/mock_data.js').logistic_orders
const status = require('utilities/mock_data.js').status
import http from 'common/http.js'
import OrderListTemplate from './templates/orderlist.template'
import HeaderTemplate from 'components/HeaderComponent/index.js'
import BannerTemplate from 'components/BannerComponent/index.js'
import OrderSorterTemplate from './templates/sorter.template'
import 'components/LeftNavComponent/index.js'
import LinksTemplate from 'components/LinksComponent/index.js'

$((function(host) {
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)

  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)

  let orderSorter = OrderSorterTemplate({
    statusAll: status.statusAll,
    status1: status.status1,
    status2: status.status2,
    status3: status.status3
  })
  $('.sorter').html(orderSorter);

  let orderListHTML = OrderListTemplate({
    orders: orders
  })

  $('.order-list').html(orderListHTML)

  LinksTemplate.render($('.links'))

})(window))
