import footerTemplate from './footer.template'
import './style.less'
import ico_url from  './ico-icp.png'

module.exports = {
  render: function($ele) {
    $ele.html(footerTemplate({
      img_url: ico_url
    }))
  }
}
