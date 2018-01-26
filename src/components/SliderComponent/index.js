import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import 'bootstrap/dist/js/bootstrap.js'
import SliderTemplate from './Slider.template'

module.exports = {
  render: function (sliders, $elem) {
    var html = ''
    sliders ? sliders : []

    html = SliderTemplate({
      sliders: sliders
    })

    if ($elem) {
      $elem.html(html)
    } else {
      return html
    }
  }
}
