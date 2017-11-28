module.exports = {
  status: {
    statusAll: '11',
    status1: '3',
    status2: '5',
    status3: '3',
  },
  logistic_orders: [{
    order: {
      number: 1,
      orderDateTime: '2017-11-14 18:52 p.m.',
      buyer: {
        name: 'Jack Sparrow',
        address: 'Jiangnan Avenue xxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxxxxxxxxxx'
      },
      deliver: 'shunfeng',
      sender: 'Shanghai Harbour',
      status: 'On-the-way'
    }
  }, {
    order: {
      number: 2,
      orderDateTime: '2017-11-14 18:52 p.m.',
      buyer: {
        name: 'Jack Sparrow',
        address: 'Jiangnan Avenue xxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxxxxxxxxxx'
      },
      deliver: 'shunfeng',
      sender: 'Shanghai Harbour',
      status: 'On-the-way'
    }
  }, {
    order: {
      number: 3,
      orderDateTime: '2017-11-14 18:52 p.m.',
      buyer: {
        name: 'Jack Sparrow',
        address: 'Jiangnan Avenue xxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxxxxxxxxxx'
      },
      deliver: 'shunfeng',
      sender: 'Shanghai Harbour',
      status: 'On-the-way'
    }
  }, {
    order: {
      number: 4,
      orderDateTime: '2017-11-14 18:52 p.m.',
      buyer: {
        name: 'Jack Sparrow',
        address: 'Jiangnan Avenue xxxxxxxxxxx-xxxxxxxxxxxxxxx-xxxxxxxxxxxxx'
      },
      deliver: 'shunfeng',
      sender: 'Shanghai Harbour',
      status: 'On-the-way'
    }
  }],
  orderManagement_order: [{
    'code': 0,
    'message': '查询应收记录成功',
    'data': [{
      'treasureReceivableId': 1,
      'treasureBillId': 789456,
      'treasureBillNo': '123456798',
      'treasureBillInputDate': '2017-11-18 15:44:46',
      'goodsPrice': 999,
      'deliveryPrice': 1,
      'totalPrice': 1000,
      'status': '已核销',
      'amountReceivable': 0,
      'amountUnreceived': 0,
      'amountReceived': 1000,
      'remitteePartyId': 567964615,
      'payerPartyId': 567964615,
      'inputMan': '谷阳阳',
      'inputDate': '2017-11-18 15:45:27',
      'updateMan': '谷阳阳',
      'updateDate': '2017-11-18 16:48:04',
      'isDeleted': false,
      'payerEnterpriseName': '强生致癌坑人有限公司'
    },
    {
      'treasureReceivableId': 2,
      'treasureBillId': 789456,
      'treasureBillNo': '123456798',
      'treasureBillInputDate': '2017-11-18 15:44:46',
      'goodsPrice': 10000,
      'deliveryPrice': 1,
      'totalPrice': 1000,
      'status': '待核销',
      'amountReceivable': 123456,
      'amountUnreceived': 1000,
      'amountReceived': 2000,
      'remitteePartyId': 567964615,
      'payerPartyId': 567964615,
      'inputMan': '谷阳阳',
      'inputDate': '2017-11-18 15:45:27',
      'updateMan': '谷阳阳',
      'updateDate': '2017-11-18 16:48:04',
      'isDeleted': false,
      'payerEnterpriseName': '强生致癌坑人有限公司'
    }
    ],
    'others': {
      'totalAmountUnreceived': 0,
      'totalAmountReceivable': 0,
      'totalAmountReceived': 1000
    }
  }],
  payable_order: [{
    'code': 0,
    'message': '',
    'data': [
      {
        'treasurePayableId': 2,
        'treasureBillId': 87,
        'treasureBillNo': '20171120134337000156796461563325',
        'treasureBillInputDate': '2017-11-20 13:44:35',
        'goodsPrice': 1000.00,
        'deliveryPrice': 0.00,
        'totalPrice': 1000.00,
        'payStatus': '待支付',
        'payMethod': '银行汇款',
        'amountPayable': 1000.00,
        'amountUnpaid': 1000.00,
        'amountPaid': 0.00,
        'payerPartyId': 567964615,
        'remitteePartyId': 9806113,
        'remitteeEnterpriseName': '和好如初',
        'inputMan': '1705041122196944',
        'inputDate': '2017-11-20 13:44:39',
        'isDeleted': false
      },
      {
        'treasurePayableId': 3,
        'treasureBillId': 88,
        'treasureBillNo': '20171120140440000156796461526227',
        'treasureBillInputDate': '2017-11-20 14:05:17',
        'goodsPrice': 1000.00,
        'deliveryPrice': 0.00,
        'totalPrice': 1000.00,
        'payStatus': '待支付',
        'payMethod': '银行汇款',
        'amountPayable': 1000.00,
        'amountUnpaid': 1000.00,
        'amountPaid': 0.00,
        'payerPartyId': 567964615,
        'remitteePartyId': 9806113,
        'remitteeEnterpriseName': '和好如初',
        'inputMan': '1705041122196944',
        'inputDate': '2017-11-20 14:05:17',
        'isDeleted': false
      },
      {
        'treasurePayableId': 4,
        'treasureBillId': 89,
        'treasureBillNo': '20171120141012000156796461539285',
        'treasureBillInputDate': '2017-11-20 14:10:50',
        'goodsPrice': 1000.00,
        'deliveryPrice': 0.00,
        'totalPrice': 1000.00,
        'payStatus': '待支付',
        'payMethod': '银行汇款',
        'amountPayable': 1000.00,
        'amountUnpaid': 1000.00,
        'amountPaid': 0.00,
        'payerPartyId': 567964615,
        'remitteePartyId': 9806113,
        'remitteeEnterpriseName': '和好如初',
        'inputMan': '1705041122196944',
        'inputDate': '2017-11-20 14:10:50',
        'isDeleted': false
      },
      {
        'treasurePayableId': 5,
        'treasureBillId': 90,
        'treasureBillNo': '20171120142133000156796461570290',
        'treasureBillInputDate': '2017-11-20 14:22:10',
        'goodsPrice': 1000.00,
        'deliveryPrice': 0.00,
        'totalPrice': 1000.00,
        'payStatus': '待支付',
        'payMethod': '银行汇款',
        'amountPayable': 1000.00,
        'amountUnpaid': 1000.00,
        'amountPaid': 0.00,
        'payerPartyId': 567964615,
        'remitteePartyId': 9806113,
        'remitteeEnterpriseName': '和好如初',
        'inputMan': '1705041122196944',
        'inputDate': '2017-11-20 14:22:11',
        'isDeleted': false
      },

    ],
    'others': {
      'totalAmountPayable': 15001.00, //总应付
      'totalAmountUnpaid': 15001.00,  //总未付
      'totalAmountPaid': 3000.00  //总已付
    },
    'totalCount': 18
  }],
  purchase_order: {
    '6': 0,
    'payStatus': {
      '0': 1
    },
    'list': [{
      'orderNumber': '00000000000',
      'inputDate': '2017-10-12 17:02:25',
      'itemName': '普通商品',
      'itemPrice': 88.00,
      'itemCount': 100.0000,
      'totalPrice': 8800.00,
      'status': '待确认',
      'itemIsDeleted': false,
      'transactionPrice': 88.00,
      'yunfei': '200',
      'itemStatus': '待支付',
      'payMethod': '承兑汇票',
      'payType': '待支付',

    },
    {
      'orderNumber': '00000000001',
      'inputDate': '2017-10-12 17:02:25',
      'itemName': '普通商品',
      'itemPrice': 88.00,
      'itemCount': 100.0000,
      'totalPrice': 8800.00,
      'status': '待确认收货',
      'itemIsDeleted': false,
      'transactionPrice': 88.00,
      'yunfei': '200',
      'itemStatus': '待支付',
      'payMethod': '承兑汇票',
      'payType': '待支付',
    },
    {
      'orderNumber': '00000000002',
      'inputDate': '2017-10-12 17:02:25',
      'itemName': '普通商品',
      'itemPrice': 88.00,
      'itemCount': 100.0000,
      'totalPrice': 8800.00,
      'status': '交易关闭',
      'itemIsDeleted': false,
      'transactionPrice': 88.00,
      'yunfei': '200',
      'itemStatus': '待支付',
      'payMethod': '承兑汇票',
      'payType': '待支付',

    }
    ]
  },
  page_data: [{
    hero_name: 'jack sparrow1',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa1',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow1',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa1',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow2',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa2',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow2',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa2',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow2',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa2',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa3',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow3',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa3',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow3',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa3',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow3',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa3',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow3',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa3',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }, {
    hero_name: 'jack sparrow',
    hero_hobbies: 'adventure over the ocean',
    hero_slogan: 'take everything, give nothing back!'
  }, {
    hero_name: 'captain barbossa',
    hero_hobbies: 'gold and apples',
    hero_slogan: 'sail beyond the sky!'
  }]
}
