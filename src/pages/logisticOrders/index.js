import 'babel-polyfill'
import './style.css'
import '../../styles/app.css'

const orders = require('../../utilities/mock_data.js').logistic_orders
const http = require('../../common/http.js')
const OrderListTemplate = require('./templates/orderlist.template')
const HeaderTemplate = require('../../components/HeaderComponent/index.js')
const BannerTemplate = require('../../components/BannerComponent/index.js')
import '../../components/LeftNavComponent/index.js'

$((function(host) {
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)

  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)

  let orderListHTML = OrderListTemplate({
    orders: orders
  })
  $('.order-list').html(orderListHTML)


})(window))
