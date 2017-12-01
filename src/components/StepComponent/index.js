import './style.less'
import template from './Step.template'

module.exports = {
  render($ele, steps, icons) {
    let stepTitles = ['提交订单', '订单确认', '物流送货', '待确认收货', '交易成功']
    // 将图标放到对应的数据中
    steps.map((s,i)=> {
      s.icon = icons[i]
      s.content = stepTitles[i]
    })
    let html = template({ steps: steps})
    $ele.html(html)
  }
}
