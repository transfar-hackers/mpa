// global assets

var dialog1 = require('../components/DialogComponent/dialog')

function getDomain() {
  let search = location.search.substring(1).split('&')
  for (let i = 0; i < search.length; i += 1) {
    if (search[i] === 'debug') {
      return ''
    }
  }

  return '//' + location.hostname
}

//获取url中的参数
function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') //构造一个含有目标参数的正则表达式对象
  var r = window.location.search.substr(1).match(reg)  //匹配目标参数
  if (r != null) return unescape(r[2]); return null //返回参数值
}

function getPartyDomain() {
  const isProduct = location.hostname === 'b2b.tf56.com'
  return isProduct ? 'https://www.tf56.com' : '//sitetest.tf56.com'
}

function createSecret() {
  return +new Date() + '-' + Math.floor(Math.random() * Math.pow(10, 18)).toString(16)
}

function checkUrlQuery(url) {
  return url.indexOf('?') === -1 ? '?' : '&'
}

function getLoginServerAddress() {
  $.ajax({
    url: '/treasureWeb/main/getLoginServerAddress.do',
    type: 'post',
    cache: false,
    contentType: 'application/json',
  }).done(function(data) {
    if (data.code === 0) {
      console.log(`inner navigate to: ${window.location.href}`)
      window.location.href = data.data + window.document.location.href
    }
  }).fail(function() {})
}

let http = {
  ajax: function(config) {
    let data

    if ($.isArray(config.data)) {
      data = []
    } else {
      data = {}
    }
    config.data = $.extend(true, data, config.data)
    config = $.extend(true, {
      type: 'post',
      cache: false,
      contentType: 'application/json'
    }, config)
    if (config.type.toLowerCase() === 'post') {
      config.data = JSON.stringify(data)
    }
    //默认timeout超时时间10分钟
    config.timeout = config.timeout || 10 * 60 * 1000
    config.url = (config.domain || getDomain()) + config.url
    delete config.domain

    const defer = $.Deferred()
    const sendAjax = (config) => {
      $.ajax(config).done(function(data) {
        try {
          data = typeof data === 'string' ? JSON.parse(data) : data
        } catch (e) {
          data = {}
        }
        switch (data.code) {
        case 401:
          console.log('you have not login yet.')
          getLoginServerAddress()
          break
        case 402: // 未完善信息
          console.log('your account information is incomplete.')
          dialog1.confirm({
            content: '您的账号未完善信息',
            ok: function() {
              window.open(`${getPartyDomain()}/v2/pages/member/myFiles/companyInfo.html`)
            }
          })
          break
        case 403: // 未认证
          console.log('your account has not been verified yet.')
          dialog1.confirm({
            content: '您的账号还没有进行认证，暂时不能下单/询价',
            okValue: '前往认证',
            ok: function() {
              dialog1.confirm({
                okValue: '我已完成认证',
                cancelValue: '认证遇到问题',
                ok: function() {
                  dialog1.alert({
                    content: '认证是人工的,需要一段时间，请耐心等待！'
                  })
                }
              })
              window.open(`${getPartyDomain()}/v2/pages/member/authentication/memberAccreditation.html?source=b2b&authType=buyer`)
            }
          })
          break
        default:
          defer.resolve(arguments)
        }
      }).fail(function() {
        defer.reject(arguments)
      })
    }
    if (config.noToken) {
      delete config.noToken
      sendAjax(config)
    } else {
      delete config.noToken
      const csrfType = createSecret()
      $.ajax({
        url: getDomain() + '/treasureWeb/csrfTokenServlet',
        type: 'post',
        cache: false,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        data: {
          csrfType
        }
      }).done(function(data) {
        if (data.result === 'success') {
          config.url = config.url + checkUrlQuery(config.url) + `csrfType=${csrfType}&csrfToken=${data.data}`
          sendAjax(config)
        }
      }).fail(function() {})
    }
    return defer.promise()
  },
  postEncoded: function() {
    const defer = $.Deferred()
    let data

    if ($.isArray(config.data)) {
      data = []
    } else {
      data = {}
    }
    data = $.extend(true, data, arguments[1])
    $.ajax({
      type: 'post',
      url: getDomain() + arguments[0],
      contentType: 'application/x-www-form-urlencoded',
      transformRequest: function(obj) {
        return $.param(obj)
      },
      data: data
    }).done(function() {
      defer.resolve(arguments)
    }).fail(function() {
      defer.reject(arguments)
    })
    return defer.promise()
  },
  getDomain,
  getPartyDomain,
  getUrlParam
}

module.exports = http
