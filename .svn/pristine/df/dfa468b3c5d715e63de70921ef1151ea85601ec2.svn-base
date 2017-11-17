import 'babel-polyfill'
import './style.less'
import Header from '../../components/HeaderComponent/index'
import '../../components/StepComponent/index.js'
$(() => {
  Header.rerender($("header"));
  $("#step").step({
    index: 0,
    time: 500,
    title: ["提交下单<br/>2017-09-12 15:25:03<br/>订单编号 00000000000",
      "订单确认 <br/>2017-09-13 15:26:55",
      "物流送货",
      "签收",
      "交易成功"
    ]
  });
});
