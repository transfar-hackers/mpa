import 'babel-polyfill'
import './style.css'

const messageTemplate = require('./Index.template')
const BasicInfo = require('../../components/BasicInfoComponent/index.js')
  // const links = require('../../components/LinksComponent/index.js');
import Links from '../../components/LinksComponent/index';
$((function(host) {
  const html = messageTemplate({
    author: 'Jack Sparrow!!!'
  })

  $('#message').html(html)
  Links.render($("#links"))
})(window))
