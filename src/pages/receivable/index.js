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

const Page = {
  initData: {
    params: {
      pageNo: 1,
      pageSize: 10,
    },
    data: {}
  },
  //初始化页面
  initPage() {
    //插入链接，头部登录,banner,左侧导航,footer
    let $headerElem = $('.header')
    HeaderTemplate.rerender($headerElem)
    let bannerHtml = BannerTemplate.render()
    $('.banner').html(bannerHtml)
    Leftnav.render($('.leftnav'))
    Footer.render($('.footer'))
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
  },
  //列表数据渲染
  renderPageWithData(receivables) {
    let self = this

    //头部应收数据
    let othersData = receivables.others
    let totalAmountUnreceived, totalAmountReceivable, totalAmountReceived

    if (othersData) {
      totalAmountUnreceived = othersData.totalAmountUnreceived
      totalAmountReceivable = othersData.totalAmountReceivable
      totalAmountReceived = othersData.totalAmountReceived
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
    //分页
    self.bindPagination(self.initData.params.pageSize, receivables.totalCount, self.initData.params.pageNo)
  },
  //获取列表数据
  getList(params) {
    let self = this
    return http.ajax({
      url: '/treasureWeb/receivable/getReceivable.do',
      data: params
    }).then(
      (res) => {
        self.renderPageWithData(res[0])
        self.initData.data = res
        return res
      },
      () => {
        $('.container').html('暂无应收记录哦( ^_^ )')
      }
    )
  },
  //核销数据请求
  vertification(id, paymentAmount, payMethod) {
    return http.ajax({
      url: '/treasureWeb/receivable/verification.do',
      data: {
        'treasureReceivableId': id,
        'paymentAmount': paymentAmount,
        'payMethod': payMethod
      }
    })
  },

  // 绑定分页事件
  bindPagination(pageSize, totalCount, currPage) {
    let self = this
    let $paginationElem = $('.my-pagination')
    let maxPage = Math.ceil(totalCount / pageSize)
    $paginationElem.pagination({
      maxPage: maxPage,
      currPage: currPage,
      callback: function (page) {
        self.initData.params.pageNo = page
        self.getList(self.initData.params)
      }
    })
  },
  //默认时间过滤
  timeFilter() {
    let self = this
    let date = new Date()
    let year = date.getFullYear()
    let months = date.getMonth() + 1
    let day = date.getDate()
    // let now = date.toLocaleDateString()
    let prev = year + '-' + self.addZero(months) + '-' + '01'
    let now = year + '-' + self.addZero(months) + '-' + self.addZero(day)
    self.initData.params.inputDateStart = prev
    self.initData.params.inputDateEnd = now
    $('#datetimepicker1').find('input').val(prev)
    $('#datetimepicker2').find('input').val(now)
    self.getList(self.initData.params)
  },
  //添零
  addZero(n) {
    if (n > 10) {
      return n
    } else {
      return '0' + n
    }
  },
  //绑定事件
  bindEventHandlers() {
    let self = this
    var id, paymentAmount, payMethod
    //只看待核销
    $(document).on('click', '#vertif', function () {
      var _this = $(this)
      if (_this.prop('checked') === true) {
        self.initData.params.status = '待核销'
      } else {
        self.initData.params.status = ''
      }
      self.initData.params.pageNo = 1
      self.getList(self.initData.params).then(function (res) {
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
      //按日期查询账单
      .on('click', '.operation-btn', function () {
        self.initData.params.pageNo = 1
        let start = $('#datetimepicker1').find('input').val()
        let end = $('#datetimepicker2').find('input').val()
        if (start > end) {
          let dialogHTML = TipDialogTemplate({
            message: '开始时间不得大于结束时间哦( ^_^ )',
            title: '信息提示',
            id: 'alert-dialog'
          })
          $('.comp-dialog').html(dialogHTML)
          $('#alert-dialog').modal()
          return
        }
        self.initData.params.inputDateStart = start
        self.initData.params.inputDateEnd = end
        self.getList(self.initData.params).then(function (res) {
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
      //请核销弹窗
      .on('click', '.vertificate', function () {
        id = $(this).data('id')
        var index = $(this).data('index')
        var receivables = self.initData.data
        var data = receivables[0].data[index]

        //总应收账款
        $('.totalAccount').text(data.amountReceivable)
        //已收账款
        $('.receivedAccount').text(data.amountReceived)
        //本次核销
        $('#inp').val(data.amountUnreceived)
        paymentAmount = $('#inp').val()
        //防止error信息重复渲染
        $('.errorMsg').html('')
      })
      //支付方式选择
      .on('click', '.vActions div', function () {
        var $this = $(this)
        var method
        if (!$this.hasClass('.selected')) {
          $('.vActions').find('.selected').removeClass('selected')
          $('.vActions').find('i').remove()
          $this.addClass('selected')
          $this.append('<i></i>')
        }
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

      })
      //确定核销
      .on('click', '.sure', function () {
        self.vertification(id, paymentAmount, payMethod).then(function (res) {
          if (res[0].code === 0) {
            $('#exampleModal').modal('hide')
            let dialogHTML = TipDialogTemplate({
              message: '核销成功( ^_^ )',
              title: '信息提示',
              id: 'alert-dialog'
            })
            $('.comp-dialog').html(dialogHTML)
            $('#alert-dialog').modal()
            self.getList(self.initData.params)
          } else {
            $('.errorMsg').css('display', 'block')
            $('.errorMsg').html(res[0].message)
          }
        })
      })

  },
  //页面加载完后执行
  mounted() {
    let self = this
    self.initPage()
    // self.getList(self.initData.params)
    self.bindEventHandlers()
    self.timeFilter()
  }
}
$(function () {
  Page.mounted()

})
