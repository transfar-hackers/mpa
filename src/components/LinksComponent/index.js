const LinksTemplate = require('./Links.template')
const LinksData = require('./LinksData.js')
import './style.less'

module.exports = {
  render: function($ele) {
    $ele.html(LinksTemplate({
      data: LinksData
    }))
  }
}
