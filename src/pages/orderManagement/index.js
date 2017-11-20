import 'babel-polyfill'
import './style.less'
import '../../styles/app.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
const Dialog = require('../../components/DialogComponent/dialog.js');
const receivables = require('../../utilities/mock_data.js').orderManagement_order;
const http = require('../../common/http.js')
const HeaderTemplate = require('../../components/HeaderComponent/index.js');
const BannerTemplate = require('../../components/BannerComponent/index.js')
import Links from '../../components/LinksComponent/index.js';
import '../../components/LeftNavComponent/index.js'
import ReceivablesTemplte from './receivables.template';

$((function (host) {
  //插入链接，头部登录,banner
  Links.render($("#links"));
  let $headerElem = $('.header');
  HeaderTemplate.rerender($headerElem);
  let bannerHtml = BannerTemplate.render()
  $('.banner').html(bannerHtml)

  //获取列表内容
  // function getList(){
  //   return http.ajax({
  //     url:'/treasureWeb/receivable/getReceivable.do',
  //     data:{
  //       "pageNo":1,
  //       "pageSize":15
  //     }
  //   });
  // }
  // var receivables =null;
  //  getList().then((res) => {
  //   if(!res || !res[0] && res[0].code !=0){
  //     dialog.alert({
  //       content:res[0].message
  //     });
  //     return;
  //   }
  //   receivables = res[0].data;
  // })
  // console.log(receivables);
  let receiveHtml = ReceivablesTemplte({
    receivablesData: receivables
  });
  $(".container").html(receiveHtml);

  //请核销弹窗
  $(".container").on("click", '.vertificate', function () {
    var id = $(this).data('id');
    //总应收账款
    $(".totalAccount").text('123456789');
    //已收账款
    $(".receivedAccount").text('9876543');
    //本次核销
    $("#inp").val('9000000');
    console.log(id);
    $(".modal").on("click", '.sure', function () {

    })
    // var dialogHtml = $(".vDialog").html();

    // Dialog.confirm({
    //   fixed: true,
    //   title: '请核销',
    //   content: dialogHtml,
    //   width: 540,
    //   ok: function(){
    //     Dialog.alert({
    //       content:'核销成功！'
    //     })
    //   }
    // })
  })

  //支付方式选中样式
  $('.vActions').on('click', 'div', function () {
    var $this = $(this);
    if (!$this.hasClass('.selected')) {
      $('.vActions').find('.selected').removeClass('selected');
      $('.vActions').find('i').remove();
      $this.addClass('selected');
      $this.append('<i>已选中</i>')
    }
  });

})(window))
