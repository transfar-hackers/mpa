import './style.less'
import template from './Step.template'

module.exports = {
  render($ele, steps) {
    let html = template({ steps: steps })
    $ele.html(html)
  }
}
