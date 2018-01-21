import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.js'
import SliderTemplate from './slider.template'

module.exports = {
  render: function ($elem, data) {
    var html = ''
    data = data ? data : {}

    html = SliderTemplate(data)

    if ($elem) {
      $elem.html(html)
    } else {
      return html
    }
  }
}
