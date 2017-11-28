module.exports = [{
  'roleType': 'common',
  'listName': '会员信息',
  'iconfont': 'icon-user',
  'subList': [{
    linksName: '基本信息',
    links: bProd ? '/mpa/user/membermsg.html' : '/user/membermsg.html',
    isNewPage: false
  }, {
    linksName: '收获地址',
    links: '/user/address.html',
    isNewPage: false
  }, {
    linksName: '发票信息',
    links: '/user/invoice.html',
    isNewPage: false
  }, {
    linksName: '浏览记录',
    links: '/user/viewHistory.html',
    isNewPage: false
  }]
}, {
  'roleType': 'common',
  'listName': '账单管理',
  'iconfont': 'icon-zhangdan',
  'subList': [{
    linksName: '应收账款',
    links: bProd ? '/mpa/receivable/index.html' : '/receivable/index.html',
    isNewPage: true
  }, {
    linksName: '应付账款',
    links: bProd ? '/mpa/payable/index.html' : '/payable/index.html',
    isNewPage: true
  }]
}, {
  'roleType': 'buyers',
  'listName': '采购管理',
  'iconfont': 'icon-transaction',
  'subList': [{
    linksName: '我的询盘',
    links: '/user/inquiry.html',
    isNewPage: false
  }, {
    linksName: '采购订单',
    links: bProd ? '/mpa/buyingOrders/index.html' : '/buyingOrders/index.html',
    isNewPage: true
  }, {
    linksName: '我发布的需求',
    links: '/user/release.html',
    isNewPage: false
  }, ]
}, {
  'roleType': 'supplier',
  'listName': '供应管理',
  'iconfont': 'icon-gongyingguanli',
  'subList': [{
    linksName: '询盘管理',
    links: '/seller/inquiry.html',
    isNewPage: false
  }, {
    linksName: '销售订单',
    links: bProd ? '/mpa/sellOrders/index.html' : '/sellOrders/index.html',
    isNewPage: true
  }, {
    linksName: '商品管理',
    goodsAdminList: [{
      linksName: '添加商品',
      links: '/seller/goodsOnshelf.html',
      isNewPage: false
    }, {
      linksName: '商品列表',
      links: '/seller/goodsList.html',
      isNewPage: false
    }, {
      linksName: '商品下架',
      links: '/seller/undercarriage.html',
      isNewPage: false
    }, {
      linksName: '集采商品列表',
      links: '/seller/jicaiGoodsList.html',
      isNewPage: false
    }]
  }]
}, {
  'roleType': 'supplier',
  'listName': '物流管理',
  'iconfont': 'icon-wuliuguanli',
  'subList': [{
    linksName: '物流订单',
    links: bProd ? '/mpa/logisticOrders/index.html' : '/logisticOrders/index.html',
    isNewPage: true
  }]
}, {
  'roleType': 'supplier',
  'listName': '金融服务',
  'iconfont': 'icon-jinrong',
  'subList': [{
    linksName: '',
    links: ''
  }]
}, {
  'roleType': 'operators',
  'listName': '平台管理',
  'iconfont': 'icon-transaction',
  'subList': [{
    linksName: '需求管理',
    links: '/seller/requirement.html',
    isNewPage: false
  }, {
    linksName: '服务提供商管理',
    links: ''
  }, ]
}, ]
