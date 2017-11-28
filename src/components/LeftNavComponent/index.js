const http = require('../../common/http.js')
const leftNavTemplate = require('./LeftNav.template')
const leftNavData = require('./LeftNavData.js')

import './style.less'

module.exports = {
  render: function($ele) {
    http.ajax({
      url: '/treasureWeb/main/getEnterpriseRole.do',
    }).then(function(data) {
      let roledata = data[0]
      if (roledata.code === 0) {
        let roleType = roledata.data ? roledata.data : []

        $ele.html(leftNavTemplate({
            data: leftNavData,
            roleData: roleType
          }))
          //下拉列表
        var flag = 0
        $('#supplier').on('click', '.goodsAdminBtn', function() {
          $('.subnav').slideToggle()

          if (flag == 0) {
            $('.goodsAdminBtn').find('span').addClass('trans')
            flag = 1
          } else {
            $('.goodsAdminBtn').find('span').removeClass('trans')
            flag = 0
          }
        })
      }
    }, function(data) {})
  }
}
