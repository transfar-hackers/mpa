import 'babel-polyfill'
import './style.less'
import '../../styles/app.css'
import Header from '../../components/HeaderComponent/index'
import Banner from '../../components/BannerComponent/index.js'
import Step from '../../components/StepComponent/index.js'
import LinksTemplate from '../../components/LinksComponent/index.js'
$(() => {
  LinksTemplate.render($('.links'))
  Header.rerender($(".header"));
  $('.banner').html(Banner.render())

  Step.render(
    $(".o-step-content"),
    [
      { icon: "icon-xiadan", title: "提交下单", time: "2017-09-12 15:25:03", isActive: true},
      { icon: "icon-dingdanqueren", title: "订单确认", time: "2017-09-12 15:25:03", isActive: true},
      { icon: "icon-wuliusonghuo", title: "物流送货", time: "2017-09-12 15:25:03", isActive: true},
      { icon: "icon-qianshou", title: "待确认收货", time: "2017-09-12 15:25:03", isActive: false},
      { icon: "icon-jiaoyichenggong", title: "交易成功", time: "2017-09-12 15:25:03", isActive: false}
    ]);
});
