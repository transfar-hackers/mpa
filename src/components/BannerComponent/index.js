import './style.css'
const logo_url = require('./logo.png')
const bannerTemplate = require('./Banner.template')

module.exports = {
  render: function($element) {
    let html = bannerTemplate({
      img_url: logo_url
    })

    if (!$element) { // if not passing an element, return html
      return html
    } else { // if passed in an element, use this element to render
      $element.html(html)
    }

  }
}
