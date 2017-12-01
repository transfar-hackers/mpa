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
import Leftnav from 'components/LeftNavComponent'
import checkDialogTemplate from './templates/checkdialog.template'
import closeOrderDialogTemplate from './templates/closeOrderdialog.template'
import logisticsTrackDialogTemplate from './templates/logisticsTrackDialog.template'
import tipDialog from './templates/tipDialog.template'
import contractSaleSignDialogTemplate from './templates/contractSaleSignDialog.template'
import stampTemplate from './templates/stamp.template'
import contractSignNoticeDialog from './templates/contractSignNoticeDialog.template'
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
    }, (data) => { alertWithMessage(data.message) })
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
    }, (data) => {
      alertWithMessage(data.message)
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
        return alertWithMessage(data.message)
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
        alertWithMessage(data.message)
      }
    }, (data) => {
      alertWithMessage(data.message)
    })
  })


  // 看看物流到哪儿
  $(document).on('click', '.whereGo', function () {
    let deliveryBillNo = $(this).attr('data-on')
    transportPath(deliveryBillNo).then((data) => {
      if (!data && !data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data) {
        let urlData = data.data
        window.open(urlData)
      } else {
        alertWithMessage(data.message)
      }
    }, (data) => {
      alertWithMessage(data.message)
    })
  })

  // 打开签章须知
  $(document).on('click', '.open-contract-salesign-notice', function () {
    let treasureContractInstanceId = $(this).attr('data-id')
    let dialogHTML = contractSignNoticeDialog({
      title: '在线签章须知',
      id: 'contract-salesign-notice',
      contractId: treasureContractInstanceId,
      confirmClass: 'open-contract-salesign-dialog',
    })
    $('.comp-tips-dialog').html(dialogHTML)
    $('#contract-salesign-notice').modal()
  })

  // 签章
  $(document).on('click', '.open-contract-salesign-dialog', function () {
    $('#contract-salesign-notice').modal('hide')
    let treasureContractInstanceId = $(this).attr('data-id')
    getContractInstanceByAjax(treasureContractInstanceId)
      .then((res) => {
        let result = res[0]
        $('.comp-dialog-salesign').html(contractSaleSignDialogTemplate({
          title: '合同签章',
          id: 'contract-salesign',
          treasureContractInstanceId: treasureContractInstanceId
        }))
        $('#contract-content').html(result.data.contractInstanceHTML)
        $('#contract-salesign').modal()
      })
  })

  $(document).on('click', '.contract-content', function (e) {
    let scrollTop = $('.contract-content').scrollTop()
    let rect = document.querySelector('.contract-content').getBoundingClientRect()
    let offsetX = e.clientX - rect.left - 35
    let offsetY = e.clientY - rect.top - 35 + scrollTop
    $('.contract-stamp').remove()
    $('#contract-content').append(stampTemplate({ offsetX, offsetY }))
  })


  // 合同签章
  $(document).on('click', '.confirm-contract-salesign', function () {
    if ($('.contract-stamp').length < 1) {
      $('.errorMsg').css('display', 'block')
      $('.errorMsg').html('请选择签章位置！')
      return
    }
    let left = $('.contract-stamp').css('left')
    let top = $('.contract-stamp').css('top')
    let stampPos = [`{1,${parseInt(left)},${parseInt(top)}}`]
    let treasureContractInstanceId = $(this).attr('data-id')
    let signStatus = 1
    let url = '/treasureWeb/contractInstance/buyerSign.do'
    sendHttpWithUrlAndParamsByAjax(url, { treasureContractInstanceId, stampPos, signStatus })
      .then(() => {
        $('#contract-salesign').modal('hide')
      })
  })
  $(document).on('click', '.check-contract-content', function () {
    let treasureContractInstanceId = $(this).attr('data-id')
    getContractInstanceByAjax(treasureContractInstanceId)
      .then((res) => {
        let result = res[0]
        if (result.code === 0) return window.open(result.data.contractInstanceUrl)
        alertWithMessage(result.message)
      })
  })

  function sendHttpWithUrlAndParamsByAjax(url, params) {
    return http.ajax({
      url: url,
      data: params
    }).then(
      (res) => {
        let result = res[0]
        if (result.code === 0) {
          ListData(1)
        }
        alertWithMessage(result.message)
      },
      () => {
        alertWithMessage('程序员正在赶来的路上，请稍等')
      })
  }
  // 获取合同
  function getContractInstanceByAjax(id) {
    return http.ajax({
      url: '/treasureWeb/contractInstance/get.do',
      data: {
        treasureContractInstanceId: id
      }
    })
  }
  // 提示框
  function alertWithMessage(message) {
    let dialogHTML = tipDialog({
      message: message,
      title: '信息提示',
      id: 'tip'
    })
    $('.error-dialog').html(dialogHTML)
    $('#tip').modal()
  }

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
        alertWithMessage(data.message)
      }
    }, (data) => {
      alertWithMessage(data.message)
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


  // 物流轨迹接口
  function transportPath(no) {
    return http.ajax({
      url: '/treasureBill/transportPathTrack.do',
      data: {
        deliveryNo: no
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




