import 'babel-polyfill'
import './style.less'
import 'styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

// imports for datetime picker
import 'bootstrap-datetime-picker'
import 'bootstrap-datetime-picker/css/bootstrap-datetimepicker.min.css'
import 'common/bootstrap-datepicker.zh-CN.js'
// end of imports for datatime picker

// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component
// const receivables = require('utilities/mock_data.js').orderManagement_order
const http = require('common/http.js')
const HeaderTemplate = require('components/HeaderComponent/index.js')
const BannerTemplate = require('components/BannerComponent/index.js')
// import Links from 'components/LinksComponent/index.js'
import Leftnav from 'components/LeftNavComponent/index.js'
import Footer from 'components/footerComponent/index.js'
import ReceivablesTemplte from './templates/receivables.template'
import ReceivablesHeaderTemplte from './templates/receivablesHeader.template'
import TipDialogTemplate from './templates/tipDialog.template'

$((function () {
  //插入链接，头部登录,banner,左侧导航,footer
  // Links.render($('#links'))
  let $headerElem = $('.header')
  HeaderTemplate.rerender($headerElem)
  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)
  Leftnav.render($('.leftnav'))
  Footer.render($('.footer'))
  //获取列表内容
  let inputDateStart, inputDateEnd, status
  getList(1)
  function getList(page) {
    return http.ajax({
      url: '/treasureWeb/receivable/getReceivable.do',
      data: {
        pageNo: page,
        pageSize: 10,
        inputDateStart: inputDateStart,
        inputDateEnd: inputDateEnd,
        status: status
      }
    }).then((res) => {

      if (!res || !res[0] && res[0].code != 0) {

        $('.container').html('暂无应收记录哦( ^_^ )')
        return
      }
      let receivables = res[0]



      const totalDataCount = receivables.totalCount
      //头部应收数据
      const othersData = receivables.others
      let totalAmountUnreceived, totalAmountReceivable, totalAmountReceived
      if (othersData) {
        totalAmountUnreceived = othersData.totalAmountUnreceived ? othersData.totalAmountUnreceived : 0
        totalAmountReceivable = othersData.totalAmountReceivable ? othersData.totalAmountReceivable : 0
        totalAmountReceived = othersData.totalAmountReceived ? othersData.totalAmountReceived : 0
      }

      let headerHtml = ReceivablesHeaderTemplte({
        othersData: {
          totalAmountUnreceived: totalAmountUnreceived,
          totalAmountReceivable: totalAmountReceivable,
          totalAmountReceived: totalAmountReceived
        }
      })
      $('.container-header').html(headerHtml)
      //应收列表数据
      let html = ReceivablesTemplte({
        receivablesData: {
          data: receivables.data
        }
      })
      $('.container-content').html(html)
      //调用分页
      bindPagination({
        maxPage: totalDataCount,
        currPage: page
      })
      //pageNumber局部刷新时需要的页码
      let pageNumber = $('.my-pagination  .pagination').find('.active').text()
      getVertificateContent(receivables, pageNumber)
      return res
    })
  }
  //请核销弹窗
  function getVertificateContent(receivables, pageNumber) {

    $('.container').on('click', '.vertificate', function () {
      var id = $(this).data('id')
      var index = $(this).data('index')

      var data = receivables.data[index]
      var paymentAmount, payMethod, method
      //总应收账款
      $('.totalAccount').text(data.amountReceivable)
      //已收账款
      $('.receivedAccount').text(data.amountReceived)
      //本次核销
      $('#inp').val(data.amountUnreceived)
      paymentAmount = $('#inp').val()
      $('.vActions').on('click', 'div', function () {
        method = $('.vActions').find('.selected').text()
        if (method === '银行卡') {
          payMethod = 1
        }
        if (method === '传化支付') {
          payMethod = 2
        }
        if (method === '承兑汇票') {
          payMethod = 3
        }
        if (method === '赊销') {
          payMethod = 4
        }
        if (method === '其他') {
          payMethod = 5
        }
        clickSure(id, paymentAmount, payMethod, pageNumber)
      })
    })
  }

  //点击核销确认按钮传参
  function clickSure(id, paymentAmount, payMethod, pageNumber) {

    $('.modal').on('click', '.sure', function () {
      //   if ($('.vActions').find('.slected').length === 0) {
      //     alert('请选择核销方式')
      //     return
      //   }
      http.ajax({
        url: '/treasureWeb/receivable/verification.do',
        data: {
          'treasureReceivableId': id,
          'paymentAmount': paymentAmount,
          'payMethod': payMethod
        }
      }).then(function (res) {

        if (res[0].code === 0) {
          $('#exampleModal').modal('hide')
          let dialogHTML = TipDialogTemplate({
            message: '核销成功( ^_^ )',
            title: '信息提示',
            id: 'alert-dialog'
          })
          $('.comp-dialog').html(dialogHTML)
          $('#alert-dialog').modal()
          getList(pageNumber)
          // location.reload()
        } else {
          $('.errorMsg').css('display', 'block')
          $('.errorMsg').html(res[0].message)
        }
      })
    })

  }

  //支付方式选中样式
  $('.vActions').on('click', 'div', function () {
    var $this = $(this)
    if (!$this.hasClass('.selected')) {
      $('.vActions').find('.selected').removeClass('selected')
      $('.vActions').find('i').remove()
      $this.addClass('selected')
      $this.append('<i></i>')
    }
  })

  //只看待核销
  vertificate()
  function vertificate() {
    $('.container').on('click', '#vertif', function () {
      var _this = $(this)

      if (_this.prop('checked') === true) {
        status = '待核销'
      } else {
        status = ''
      }
      // getList(1)
      getList(1).then(function (res) {
        if (res[0].code === 0 && res[0].data.length === 0) {
          //提示窗
          let dialogHTML = TipDialogTemplate({
            message: '暂无待核销记录哦( ^_^ )',
            title: '信息提示',
            id: 'alert-dialog'
          })
          $('.comp-dialog').html(dialogHTML)
          $('#alert-dialog').modal()

        }
      })
    })
  }

  //datetime picker codes
  $('#datetimepicker1').datetimepicker({
    minView: 'month',
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    autoclose: 1,
  })
  $('#datetimepicker2').datetimepicker({
    minView: 'month',
    format: 'yyyy-mm-dd',
    language: 'zh-CN',
    autoclose: 1,
  })

  $('.order-date').on('click', 'button', function () {
    inputDateStart = $('#datetimepicker1').find('input').val()
    inputDateEnd = $('#datetimepicker2').find('input').val()
    getList(1).then(function (res) {
      if (res[0].code === 0 && res[0].data.length === 0) {
        // alert('暂无该日期范围应收记录哦( ^_^ )')
        let dialogHTML = TipDialogTemplate({
          message: '暂无该日期范围应收记录哦( ^_^ )',
          title: '信息提示',
          id: 'alert-dialog'
        })
        $('.comp-dialog').html(dialogHTML)
        $('#alert-dialog').modal()
      }
    })
  })
  //end of datatime picker codes

  // pagination codes
  function bindPagination(options) {
    let $paginationElem = $('.my-pagination')
    var maxPage = Math.ceil(options.maxPage / 10)
    $paginationElem.pagination({
      maxPage: maxPage,
      currPage: options.currPage,
      callback: function (page) {
        getList(page)
      }
    })
  }
})(window))
