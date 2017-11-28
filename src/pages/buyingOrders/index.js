import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'styles/base.less'
import 'styles/dialog.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component

// const PurchaseData = require('utilities/mock_data.js').purchase_order
import http from 'common/http.js'
import OrderListTemplate from './templates/orderlist.template'
import OrderSorterTemplate from './templates/sorter.template'
import HeaderTemplate from 'components/HeaderComponent'
import BannerTemplate from 'components/BannerComponent'
// import Links from 'components/LinksComponent/index.js'
import Leftnav from 'components/LeftNavComponent'
import checkDialogTemplate from './templates/checkdialog.template'
import closeOrderDialogTemplate from './templates/closeOrderdialog.template'
import logisticsTrackDialogTemplate from './templates/logisticsTrackDialog.template'
import tipDialog from './templates/tipDialog.template'

// import LinksTemplate from '../../components/LinksComponent/index.js'
$((function (host) {
  let orderList = ''
  let payStatus = ''
  let status = ''
  let flag = true
  // 插入链接，头部登录,banner,左侧导航
  // Links.render($('.links'))
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)

  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)

  Leftnav.render($('.m-leftnav'))

  // 确认收货按钮弹窗html加载
  let $dialogElem = $('.comp-dialog')
  // let dialogHTML = checkDialogTemplate({
  //   id: 'checkOrder',
  //   title: '请确认收货',
  //   positive: '确认',
  //   negative: '取消'
  // })
  // $dialogElem.html(dialogHTML)
  // 点击确认收货按钮



  // http.ajax({
  //   url:'/treasureWeb/contract/getAll.do',
  //   data:{
  //     pageNo:1,
  //     pageSize:10
  //   }
  // }).then((data)=>{
  //   console.log(data)
  // })

  $('.content').on('click', '.checkBtn', function () {
    let element = this
    let id = element.getAttribute('data-id')
    let dialogHTML = checkDialogTemplate({
      id: 'checkOrder',
      title: '请确认收货',
      positive: '确认',
      negative: '取消',
      orderId: id
    })
    $dialogElem.html(dialogHTML)
  })


  // 确认收货按钮
  $('.comp-dialog').on('click', '.sure-btn', function () {
    let $this = $(this)
    let orderId = $this.attr('data-id')
    checkOkOrder(orderId).then((data) => {
      if (!data && data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data === 1) {
        $('#checkOrder').modal('hide')
        ListData(1)
      } else {
        $('.errorMsg').css('display', 'block')
        $('.errorMsg').html(data.message)
      }
    }, () => { })
  })


  // 取消订单按钮弹窗html加载
  let $dialogOrder = $('.comp-dialog-order')

  // let dialogOrderHTML = closeOrderDialogTemplate({
  //   id: 'closeOrder',
  //   title: '取消订单',
  //   positive: '确认',
  //   negative: '取消'
  // })

  //$dialogOrder.html(dialogOrderHTML)
  // 取消按钮弹窗
  $('.content').on('click', '.closeOrder', function () {
    let element = this
    let orderId = element.getAttribute('data-id')
    // 数据重新加载
    let dialogOrderHTMLAgain = closeOrderDialogTemplate({
      id: 'closeOrder',
      title: '取消订单',
      positive: '确认',
      negative: '取消',
      orderId: orderId
    })
    $dialogOrder.html(dialogOrderHTMLAgain)
  })

  // 取消订单确认
  $('.comp-dialog-order').on('click', '.sure-btn', function () {
    let $this = $(this)
    let orderId = $this.attr('data-id')
    let state = $('.explain').val()
    cancelOrder(orderId, state).then((data) => {
      if (!data && data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data === 1) {
        $('#closeOrder').modal('hide')
        ListData(1)
      } else {
        $('.errorMsg').css('display', 'block')
        $('.errorMsg').html(data.message)
      }
    })
  })
  // 物流跟踪
  $('.content').on('click', '.logisticTrack', function () {
    let $this = $(this)
    let billId = $this.attr('data-id')
    let companyId = $this.attr('data-companyid')
    $('.comp-dialog-logisticTrack').html('')
    logisticsOrder(billId, companyId).then(function (data) {
      if (!data && !data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data) {
        let logisticsList = data
        let logisticTrackHTMLAgain = logisticsTrackDialogTemplate({
          id: 'logisticTrack',
          title: '物流跟踪',
          logisticsList: logisticsList
        })
        $('.comp-dialog-logisticTrack').html(logisticTrackHTMLAgain)
        $('#logisticTrack').modal()
      } else {
        let dialogHTML = tipDialog({
          message: data.message,
          title: '信息提示',
          id: 'logisticTrack'
        })
        $('.comp-dialog-logisticTrack').html(dialogHTML)
        $('#logisticTrack').modal()
      }
    })
  })



  // 状态筛选
  $('.content').on('click', '.statusSelect', function () {
    var $this = $(this)
    flag = false
    if (!$this.hasClass('.current')) {
      $('.content').find('.current').removeClass('current')
      $this.addClass('current')
    }
    if ($this.html() == '全部') {
      payStatus = ''
      status = ''
    } else if ($this.html() == '待支付') {
      payStatus = '待支付'
      status = ''

    } else if ($this.html() == '待确认收货') {
      status = '待确认收货'
      payStatus = ''
    }
    ListData(1)

  })

  let pageSize = 10
  let totalDataCount = 0

  // 列表初期化
  ListData(1)
  // 订单列表
  function ListData(pageNo) {
    getListData(pageNo).then((data) => {
      if (!data && !data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data) {
        orderList = data.data || []
        totalDataCount = data.totalCount
        if (flag) {
          let orderSorter = OrderSorterTemplate({
            orderAll: orderList['0'],
            orderPayStay: orderList.payStatus['0'],
            orderCheckStay: orderList[6]
          })
          $('.sorter').html(orderSorter)
        }
        let orderListHTML = OrderListTemplate({
          orders: orderList.list
        })
        $('.order-list').html(orderListHTML)
        bindPagination({
          maxPage: totalDataCount,
          currPage: pageNo
        })
      } else {
        alert(data.message)
      }
    }, (data) => {
      alert(data.message)
    })
  }

  // 采购订单接口
  function getListData(pageNo) {
    return http.ajax({
      url: '/treasureWeb/treasureBill/getMyBillVOList.do',
      data: {
        pageSize: pageSize,
        pageNo: pageNo,
        statusStr: '6', // 待确认1，待提货2，交易完成3，待发货4，已发货5，待确认收货6，交易关闭7
        startTimeStr: '0',
        payStatusStr: '0', //  0:待支付；1：已支付
        payStatus: payStatus,
        status: status
      }
    })
  }

  // 取消订单接口
  function cancelOrder(id, state) {
    return http.ajax({
      url: '/treasureWeb/treasureBillStatusUpdate/closeBill.do',
      data: {
        'treasureBillId': id,
        'state': state
      }
    })
  }


  // 确认收货接口
  function checkOkOrder(id) {
    return http.ajax({
      url: '/treasureWeb/treasureBillStatusUpdate/complete.do',
      data: {
        treasureBillId: id
      }
    })
  }

  // 物流信息接口
  function logisticsOrder(billId, enterpriseId) {
    return http.ajax({
      url: '/treasureWeb/treasureBill/getLogisticsInfo.do',
      data: {
        treasureBillId: billId,
        treasureEnterpriseId: enterpriseId
      }
    })
  }

  // 翻页
  function bindPagination(options) {
    let $paginationElem = $('.my-pagination')
    var maxPage = Math.ceil(options.maxPage / 10)
    $paginationElem.pagination({
      maxPage: maxPage,
      currPage: options.currPage,
      callback: function (page) {
        ListData(page)
      }
    })
  }

})(window))




