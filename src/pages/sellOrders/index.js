import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'styles/dialog.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component

import http from 'common/http.js'
import OrderListTemplate from './templates/orderlist.template'
import OrderSorterTemplate from './templates/sorter.template'
import HeaderTemplate from 'components/HeaderComponent/index.js'
import BannerTemplate from 'components/BannerComponent/index.js'
import Links from 'components/LinksComponent/index.js'
import Leftnav from 'components/LeftNavComponent/index.js'
import logisticsTrackDialogTemplate from './templates/logisticsTrackDialog.template'
import tipDialog from './templates/tipDialog.template'
import closeOrderDialogTemplate from './templates/closeOrderdialog.template'
const Page = {
  initData: {
    pageSize: 10,
    pageNo: 1,
    statusStr: '1,3,6',
    startTimeStr: 0
  },
  // 初始化页面
  initPage() {
    //插入链接，头部登录,banner,左侧导航
    Links.render($('.links'))
    HeaderTemplate.rerender($('.header'))
    $('.banner').html(BannerTemplate.render())
    Leftnav.render($('.m-leftnav'))
  },
  renderPageWithData(sellOrders, sign) {
    let self = this
    let sorterData = {
      toBeConfirmed: sellOrders.data['1'],
      toBeTaked: sellOrders.data['6'],
      dealClose: sellOrders.data['3']
    }
    if (sign != 1) {
      $('.sorter').html(OrderSorterTemplate(sorterData))
    }
    //列表
    $('.order-list').html(OrderListTemplate({ orders: sellOrders.data.list }))
    //分页
    self.bindPagination(self.initData.pageSize, sellOrders.totalCount, self.initData.pageNo)
  },
  // 获取列表数据
  /**
   *  @params sign 控制页面哪里不刷新
   */
  getSellOrderListByAjax(params, sign) {
    let self = this
    http.ajax({
      url: '/treasureWeb/treasureBillSaleMan/getBillVOList.do',
      data: params
    }).then(
      (res) => {
        if (!res[0]) {
          return self.alertWithMessage('程序员正在赶来的路上，请稍等')
        }
        self.renderPageWithData(res[0], sign)
      },
      () => {
        self.alertWithMessage('程序员正在赶来的路上，请稍等')
      })
  },
  // 获取物流详情
  logisticsOrderByAjax(billId, enterpriseId) {
    return http.ajax({
      url: '/treasureWeb/treasureBill/getLogisticsInfo.do',
      data: {
        treasureBillId: billId,
        treasureEnterpriseId: enterpriseId
      }
    })
  },
  // 发送请求
  sendHttpWithUrlAndParamsByAjax(url, params) {
    let self = this
    http.ajax({
      url: url,
      data: params
    }).then(
      (res) => {
        let result = res[0]
        if (result.code === 0) {
          self.getSellOrderListByAjax(self.initData)
          return
        }
        self.alertWithMessage(result.message)
      },
      () => {
        self.alertWithMessage('程序员正在赶来的路上，请稍等')
      })
  },
  // 提示框
  alertWithMessage(message) {
    let dialogHTML = tipDialog({
      message: message,
      title: '信息提示',
      id: 'tips'
    })
    $('.comp-tips-dialog').html(dialogHTML)
    $('#tips').modal()
  },
  // 绑定分页事件
  bindPagination(pageSize, totalCount, currPage) {
    let self = this
    let $paginationElem = $('.order-pagination')
    let maxPage = Math.ceil(totalCount / pageSize)
    $paginationElem.pagination({
      maxPage: maxPage,
      currPage: currPage,
      callback: function (page) {
        self.initData.pageNo = page
        self.getSellOrderListByAjax(self.initData, 1)
      }
    })
  },
  // 绑定事件
  bindEventHandlers() {
    let self = this
    // 展示运费编辑
    $(document)
      // 状态筛选
      .on('click', '.statusSelect', function () {
        var $this = $(this)
        if (!$this.hasClass('.current')) {
          $('.content').find('.current').removeClass('current')
          $this.addClass('current')
        }
        if ($this.html() == '全部') {
          delete  self.initData.status
          self.initData.statusStr = '1,3,6'
        } else if ($this.html() == '待确认') {
          self.initData.status = '待确认'
          self.initData.statusStr = ''
        } else if ($this.html() == '待收货') {
          self.initData.status = '待确认收货'
          self.initData.statusStr = ''
        } else if ($this.html() == '交易完成') {
          self.initData.status = '交易完成'
          self.initData.statusStr = ''
        }
        self.getSellOrderListByAjax(self.initData, 1)
      })
      .on('click', '.order-edit-wuliu', function () {
        let $ele = $(this).parents('.comp-lo-order').find('.comp-lo-order-footer')
        $ele.css('display', 'flex')
      })
      // 取消运费编辑
      .on('click', '.cancel-edit-wuliu', function () {
        let $ele = $(this).parents('.comp-lo-order-footer')
        $ele.css('display', 'none')
      })
      .on('click', '.confirm-edit-wuliu', function () {
        let deliveryPrice = $(this).prevAll('.delivery-price').val()
        let treasureBillId = $(this).attr('data-id')
        if (!deliveryPrice) {
          return self.alertWithMessage('请填写运费')
        }
        let url = '/treasureWeb/treasureBillSaleMan/editDeliveryPrice.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { treasureBillId, deliveryPrice })
      })
      .on('click', '.order-confirm', function () {
        let treasureBillId = $(this).attr('data-id')
        let url = '/treasureWeb/treasureBillStatusUpdate/confirmBill.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { treasureBillId })
      })
      .on('click', '.check-order-detail', function () {
        let treasureBillId = $(this).attr('data-id')
        window.open(`/orderdetail/index.html?id=${treasureBillId}`, '_blank')
      })
      // 指派业务员
      .on('click', '.order-fenpei', function () {
        let $ele = $(this).parents('.comp-lo-order').find('.comp-lo-order-sales-man-footer')
        $ele.css('display', 'flex')
      })
      .on('click', '.cancel-select-sale-man', function () {
        let $ele = $(this).parents('.comp-lo-order-sales-man-footer')
        $ele.css('display', 'none')
      })
      // 发送指派业务员请求
      .on('click', '.confirm-select-sale-man', function () {
        let salesMan = $(this).prevAll('.sales-man-name').val()
        let salesContact = $(this).prevAll('.sales-man-mobile').val()
        let treasureBillId = $(this).attr('data-id')
        if (!salesMan) {
          return self.alertWithMessage('请选择业务员！')
        }
        if (!salesContact) {
          return self.alertWithMessage('请填写电话号码！')
        }
        let url = '/treasureWeb/treasureBillSaleMan/assignBillSalesMan.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { salesMan, salesContact, treasureBillId })
      })
      // 提货
      .on('click', '.pick-up-goods', function () {
        let treasureBillId = $(this).attr('data-id')
        let url = '/treasureWeb/treasureBillStatusUpdate/pickUpGoods.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { treasureBillId })
      })
      // 订单取消
      .on('click', '.closeOrder', function () {
        $('.comp-dialog-order').html('')
        let orderId = $(this).attr('data-id')
        $('.comp-dialog-order').html(closeOrderDialogTemplate({
          id: 'closeOrder',
          title: '取消订单',
          positive: '确认',
          negative: '取消',
          orderId: orderId
        }))
        $('#closeOrder').modal({ backdrop: 'static' })

      })
      .on('click', '.close-sure-btn', function () {
        let state = $('.explain').val()
        let treasureBillId = $(this).attr('data-id')
        if (!state) {
          $('.errorMsg').css('display', 'block')
          $('.errorMsg').html('说明不能为空')
          return
        }
        $('#closeOrder').modal('hide')
        let url = '/treasureWeb/treasureBillStatusUpdate/closeBill.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { state, treasureBillId })
      })
      // 确认收款
      .on('click', '.order-confirm-receipt', function () {
        let treasureBillId = $(this).attr('data-id')
        let url = '/treasureWeb/treasureBillSaleMan/confirmReceipt.do'
        self.sendHttpWithUrlAndParamsByAjax(url, { treasureBillId })
      })
      .on('click', '.send-bill-to-oms', function () {
        let treasureBillId = $(this).attr('data-id')
        window.open(`/treasureWeb/treasureBillSaleMan/sendBill2OMS.do?treasureBillId=${treasureBillId}`, '_blank')
      })
      .on('click', '.logisticTrack', function () {
        let $this = $(this)
        let billId = $this.attr('data-id')
        let companyId = $this.attr('data-companyid')
        $('.comp-dialog-logisticTrack').html('')
        self.logisticsOrderByAjax(billId, companyId).then(function (res) {
          let result = res[0]
          if (result.code === 0 && result.data) {
            let logisticTrackHTMLAgain = logisticsTrackDialogTemplate({
              id: 'logisticTrack',
              title: '物流跟踪',
              logisticsList: result
            })
            $('.comp-dialog-logisticTrack').html(logisticTrackHTMLAgain)
            $('#logisticTrack').modal()
          } else {
            let dialogHTML = tipDialog({
              message: result.message,
              title: '信息提示',
              id: 'logisticTrack'
            })
            $('.comp-dialog-logisticTrack').html(dialogHTML)
            $('#logisticTrack').modal()
          }
        })
      })
  },
  // 页面加载完之后执行
  mounted() {
    let self = this
    self.initPage()
    self.getSellOrderListByAjax(self.initData)
    self.bindEventHandlers()
  }
}
$((function () {
  Page.mounted()
})(window))