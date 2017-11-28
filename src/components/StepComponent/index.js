import './style.less'
import template from './Step.template'

module.exports = {
  render($ele, steps, icons) {
    // 将图标放到对应的数据中
    steps.map((s,i)=> {
      s.icon = icons[i]
    })
    let html = template({ steps: steps})
    $ele.html(html)
  }
}
