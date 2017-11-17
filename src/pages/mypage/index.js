import 'babel-polyfill'
import './style.less'
import '../../components/LeftNavComponent/index.js'

const headerTemplate = require('../../components/HeaderComponent/index.js')

$((function(host) {
  let $header = $('header')
  headerTemplate.rerender($header)

})(window))
