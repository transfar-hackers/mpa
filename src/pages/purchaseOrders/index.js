import 'babel-polyfill'
import './style.css'
import '../../styles/app.css'

// const orders = require('../../utilities/mock_data.js').logistic_orders
// const status = ('../../utilirequireties/mock_data.js').status
const http = require('../../common/http.js')
const OrderListTemplate = require('./templates/orderlist.template')
const OrderSorterTemplate = require('./templates/sorter.template')
const HeaderTemplate = require('../../components/HeaderComponent/index.js')
const BannerTemplate = require('../../components/BannerComponent/index.js')
import Links from '../../components/LinksComponent/index.js';
import '../../components/LeftNavComponent/index.js'
// import LinksTemplate from '../../components/LinksComponent/index.js'

$((function(host) {
  //插入链接，头部登录,banner
  Links.render($(".links"));
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)

  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)


  // getListData(1).then((data)=>{
  // 	console.log(data);
  // 	if(!data && !data[0]){
  // 		return
  // 	}
  // 	data = data[0];
  // 	if(data.code === 0 && data.data){
  // 		var orderList = data.data || [];
  // 		let orderSorter = OrderSorterTemplate({
  // 			orderAll: orderList.'0',
  // 			orderPayStay: orderList.payStatus[0].'0',
  // 			orderCheckStay: orderList.'6'
  // 		})
  // 		$('.sorter').html(orderSorter);

		//   let orderListHTML = OrderListTemplate({
		//  		orders: orderList.list
		//   })
		//   $('.order-list').html(orderListHTML)
  // 	}

  // },(data)=>{})

})(window))

// 采购订单接口
// function getListData(pageNo){
// 	return http.ajax({
// 	  	url:'/treasureWeb/treasureBill/getMyBillVOList.do',
// 	  	data:{
// 	  		pageSize: '10',
// 	  		pageNo: pageNo,
// 	  		statusStr: '6',
// 	  		startTimeStr: '0',
// 	  		payStatusStr: '0'
// 	  	}
// 	})
// }