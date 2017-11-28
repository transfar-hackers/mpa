import 'babel-polyfill'
import '../receivable/style.less'
import 'styles/app.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

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
// let payables = require('utilities/mock_data.js').payable_order
const http = require('common/http.js')
const HeaderTemplate = require('components/HeaderComponent/index.js')
const BannerTemplate = require('components/BannerComponent/index.js')
import Footer from 'components/footerComponent/index.js'
import Leftnav from 'components/LeftNavComponent/index.js'
import payablesTemplate from './payables.template'
import TipDialogTemplate from '../receivable/templates/tipDialog.template'

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
  let treasureBillInputDateStart, treasureBillInputDateEnd
  getList(1)
  function getList(page) {
    return http.ajax({
      url: '/treasureWeb/treasurePayableController/getTreasurePayableList.do',
      data: {
        pageNo: page,
        pageSize: 10,
        treasureBillInputDateStart: treasureBillInputDateStart,
        treasureBillInputDateEnd: treasureBillInputDateEnd
      }
    }).then((res) => {

      if (!res || !res[0] && res[0].code != 0) {

        $('.container').html('暂无应付记录哦( ^_^ )')
        return
      }
      let payables = res[0]

      const totalDataCount = payables.totalCount
      //头部应付数据
      let totalAmountPayable, totalAmountUnpaid, totalAmountPaid
      const othersData = payables.others

      if (othersData) {
        totalAmountPayable = othersData.totalAmountPayable ? othersData.totalAmountPayable : 0
        totalAmountUnpaid = othersData.totalAmountUnpaid ? othersData.totalAmountUnpaid : 0
        totalAmountPaid = othersData.totalAmountPaid ? othersData.totalAmountPaid : 0
      }
      //应付数据模板渲染
      let html = payablesTemplate({
        payablesData: {
          others: {
            totalAmountPayable: totalAmountPayable,
            totalAmountUnpaid: totalAmountUnpaid,
            totalAmountPaid: totalAmountPaid
          },
          data: payables.data
        }
      })
      $('.container').html(html)
      //分页
      bindPagination({
        maxPage: totalDataCount,
        currPage: page
      })
      return res
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
    treasureBillInputDateStart = $('#datetimepicker1').find('input').val()
    treasureBillInputDateEnd = $('#datetimepicker2').find('input').val()
    getList(1).then(function (res) {
      if (res[0].code === 0 && res[0].data.length === 0) {
        //提示窗
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
