import './header.less'
import http from '../../common/http'

let template = require('./Header.template')

/*
* return value example:
{
    "code": 0,
    "message": "已经登录",
    "data": {
        "operatorid": "995295777",
        "partyname": "1705041122196944",
        "partyid": "567964615",
        "mobilenumber": "18357114026",
        "partytype": "企业",
        "operator": "admin",
        "realname": "和好如初",
        "accountNumber": "8802000082745"
    },
    "others": {},
    "totalCount": 0
}
*/
function getUserInfo() {
  return http.ajax({
    url: '/treasureWeb/main/getUserSeesion.do',
    type: 'POST'
  }).then((res) => {
    let result = res[0]
    if (result && result.code === 0) {
      let isLogin = result.data ? true : false
      let loginInfoData = {
        isLogin: isLogin,
        partyname: isLogin ? result.data.partyname ? result.data.partyname : '' : ''
      }
      return loginInfoData
    }
  })
}


function getUserRole(loginInfoData) {
  return http.ajax({
    url: '/treasureWeb/main/getEnterpriseRole.do',
    type: 'POST'
  }).then((res) => {
    let data = res[0]
    let role = ''

    if (data && data.code === 0) {
      let rolePriorities = ['visitor', '采购商', '供应商', '运营商']
      let roleDefaultPage = ['mpa/buyingOrders/index.html', 'mpa/buyingOrders/index.html', 'mpa/sellOrders/index.html', '/seller/requirement.html']
      let roleLevel = -1
      // loop through all roles of a user
      $(data.data).each(function(index, item) {
        if (item.roleType === '运营商') {
          role = '运营商'
          roleLevel = 3
        } else if (item.roleType === '供应商') {
          role = '供应商'
          roleLevel > 2 ? '' : roleLevel = 2
        } else if (item.roleType === '采购商') {
          role = '采购商'
          roleLevel = 1
          roleLevel > 1 ? '' : roleLevel = 1
        } else {
          // no role or visitor role
          role = 'visitor'
          ua.url = ''
          loginInfoData.url = ''
          roleLevel = 0
        }
      })
      loginInfoData.role = rolePriorities[roleLevel]
      loginInfoData.url = roleDefaultPage[roleLevel]

      return loginInfoData
    }
    return null
  })
}

module.exports = {
  // 1. get login status --> isLogin
  // 2. if already login
  //   2.1 get user name --> partyname
  //   2.2 get user roles --> roles
  //   2.3 get default page url for the login user --> url
  // 3. bind event handlers
  getUserInfo: getUserInfo,
  getUserRole: getUserRole,
  render: function(userStatus) {
    let html = template(userStatus)
    console.log(`header html: ${html}`)
    return html
  },
  rerender: function($headerElem) { //
    let html = ''
    this.getUserInfo().then(data => {
      this.getUserRole(data).then(data => {
        let html = template(data)
        $headerElem.html(html)
        this.bindEventHandlers()
      }, error => {})
    }, error => {})
  },
  bindEventHandlers: function initHeader($headerElem) {
    // feedback plugin
    var fkHtml = '<script id="tfFeedBackScriptId" src=\'https://hivetest.tf56.com/hiveService/js/views/feedback/feedback.js\' product="B2B" productVersion="V1.1.1"></script>'
    $('body').append(fkHtml)
    // end feedback plugin

    $(document).on('click', '#logOut', function() {
      http.ajax({
        url: '/passport/logoutWeb',
        domain: 'https://passport.tf56.com',
        noToken: true,
        cache: true,
        dataType: 'jsonp',
        type: 'get'
      }).then(function(data) {
        if (data[1] === 'success') {
          // rerender($headerElem)
          window.location.reload()
        }
      }, function(data) {})
    }).on('click', '#login', function() {
      http.ajax({
        url: '/treasureWeb/main/getLoginServerAddress.do',
        type: 'post'
      }).then(function(data) {
        var data = data[0]
        if (data && data.code == 0) {
          window.location.href = data.data + window.document.location.href
        }
      }, function(data) {})
    }).on('click', '#registe', function() {
      http.ajax({
        url: '/treasureWeb/main/getLoginServerAddress.do',
        type: 'post'
      }).then(function(data) {
        var data = data[0]
        if (data && data.code == 0) {
          window.location.href = data.data + window.document.location.href
        }
      }, function(data) {})
    })
  }
}

function isProduct() {
  // if hostname contains 'test' or 'dev', it's not production
  var bIsProduct = window.location.hostname.indexOf('mpa') === -1 ||
    window.location.hostname.indexOf('dev') ||
    window.location.hostname.indexOf('test') === -1
  return bIsProduct
}

function getDomain() {
  return isProduct() ? 'https://passport.tf56.com' : '//sitetest.tf56.com'
}
