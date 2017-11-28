import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component

// const orders = require('utilities/mock_data.js').logistic_orders
// const status = require('utilities/mock_data.js').status
import favicon from 'styles/images/favicon.ico'
import http from 'common/http.js'
import OrderListTemplate from './templates/orderlist.template'
import HeaderTemplate from 'components/HeaderComponent/index.js'
import BannerTemplate from 'components/BannerComponent/index.js'
import OrderSorterTemplate from './templates/sorter.template'
import LeftnavTemplate from 'components/LeftNavComponent/index.js'
import logisticsTrackDialogTemplate from './templates/logisticsTrackDialog.template'
// import LinksTemplate from 'components/LinksComponent/index.js'

$((function () {
  let pageSize = 10
  let status = '全部'
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)
  // end of add favicon
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)
  LeftnavTemplate.render($('.m-leftnav'))

  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)
  // 初期显示头部
  statusNum().then((data) => {
    if (!data && data[0]) {
      return
    }
    data = data[0]
    if (data.code === 0 && data.data) {
      let statusData = data.data || []
      let orderSorter = OrderSorterTemplate({
        status1: statusData[1].count,
        status2: statusData[2].count,
        status3: statusData[3].count
      })
      $('.sorter').html(orderSorter)
    }
  })
  // 状态筛选
  $('.content').on('click', '.statusSelect', function () {
    var $this = $(this)
    if (!$this.hasClass('.current')) {
      $('.content').find('.current').removeClass('current')
      $this.addClass('current')
    }
    if ($this.html() == '全部') {
      status = '全部'
    } else if ($this.html() == '待受理') {
      status = '待受理'
    } else if ($this.html() == '配送中') {
      status = '配送中'
    } else if ($this.html() == '已签收') {
      status = '已签收'
    }
    listData(1)

  })

  // 物流跟踪
  $('.content').on('click', '.logisticTrack', function () {
    let $this = $(this)
    let billId = $this.attr('data-id')
    let companyId = $this.attr('data-companyid')
    $('.comp-dialog-logisticTrack').html('')
    logisticsOrder(billId, companyId).then(function(data) {
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
      }
    })
  })

  // 列表
  listData(1)
  function listData(pageNo) {
    logisticsOrderList(pageNo).then((data) => {
      if (!data && !data[0]) {
        return
      }
      data = data[0]
      if (data.code === 0 && data.data) {
        let logisticList = data.data || []
        let totalDataCount = data.totalCount
        let orderListHTML = OrderListTemplate({
          orders: logisticList
        })
        $('.order-list').html(orderListHTML)
        bindPagination({
          maxPage: totalDataCount,
          currPage: pageNo
        })
      }
    }, () => { })
  }

  // 翻页
  function bindPagination(options) {
    // let $orderList = $('.order-list')
    let $paginationElem = $('.my-pagination')
    var maxPage = Math.ceil(options.maxPage / 10)
    $paginationElem.pagination({
      maxPage: maxPage,
      currPage: options.currPage,
      callback: function (page) {
        listData(page)
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
  // LinksTemplate.render($('.links'))
  // 物流list
  function logisticsOrderList(pageNo) {
    return http.ajax({
      url: '/treasureWeb/treasureBillSaleMan/getTransferBillList.do',
      data: {
        pageNo: pageNo,
        pageSize: pageSize,
        status: status
      }
    })
  }
  function statusNum() {
    return http.ajax({
      url: '/treasureWeb/treasureBillSaleMan/getTransferBillListCount.do'
    })
  }
})())
