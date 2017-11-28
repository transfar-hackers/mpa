import 'babel-polyfill'
import './style.less'
import '../../styles/app.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import http from 'common/http.js'
import Header from '../../components/HeaderComponent/index'
import Banner from '../../components/BannerComponent/index.js'
import Step from '../../components/StepComponent/index.js'
// import LinksTemplate from '../../components/LinksComponent/index.js'
import TimelineTmp from './templates/timeline.template'
import orderDetailTmp from './templates/orderDetail.template'
import chargeInfoTmp from './templates/chargeInfo.template'
import goodsDetailTmp from './templates/goodsDetail.template'

const Page = {
  // 初始数据
  initData : {
    iocns: ['icon-xiadan', 'icon-dingdanqueren', 'icon-wuliusonghuo', 'icon-qianshou', 'icon-jiaoyichenggong']
  },
  initPage() {
    // LinksTemplate.render($('.links'))
    Header.rerender($('.header'))
    $('.banner').html(Banner.render())
  },
  renderPageWithData(orderDetail) {
    let self = this
    // 渲染订单状态流转情况
    $('.treasureBillNo').text(orderDetail.treasureBillVO.treasureBillNo)
    Step.render($('.o-step-content'), orderDetail.treasureBillStatusRecordVOsForTitle, self.initData.iocns)
    $('.o-time-content').html(TimelineTmp({ recordVOs: orderDetail.treasureBillStatusRecordVOs }))
    $('.o-order-detail').html(orderDetailTmp(orderDetail.treasureBillVO))
    $('.o-charges').html(chargeInfoTmp(orderDetail.treasureBillVO))
    $('.o-goods-detail').html(goodsDetailTmp(orderDetail.treasureBillVO))
  },
  getOrderDetailByAjax() {
    let self = this
    let treasureBillId = http.getUrlParam('id')
    http.ajax({
      url: '/treasureWeb/treasureBill/getBillDetail.do',
      data: {treasureBillId}
    }).then(
      (res) => {
        let result = res[0]
        if (result.code === 0) {
          self.renderPageWithData(result.data)
          return
        }
        alert(result.message)
      },
      () => {
        alert('程序员正在赶来的路上，请稍等')
      })
  },
  // 页面加载完之后执行
  mounted() {
    let self = this
    self.initPage()
    self.getOrderDetailByAjax()
  }
}

$(() => {
  Page.mounted()
})
