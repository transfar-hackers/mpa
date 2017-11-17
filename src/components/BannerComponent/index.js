import './style.css'
const logo_url = require('./logo.png')
const bannerTemplate = require('./Banner.template')

module.exports = {
  render: function() {
    let html = bannerTemplate({
      img_url: logo_url
    })

    return html
  }
}
