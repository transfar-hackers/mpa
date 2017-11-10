import 'babel-polyfill'
import './style.css'

const messageTemplate = require('./Index.template')
const BasicInfo = require('../../components/BasicInfoComponent/index.js')

$((function(host) {
  const html = messageTemplate({
    author: 'Jack Sparrow!!!'
  })

  let html2 = BasicInfo.render()

  var greet = (msg) => console.log(msg)
  greet('hello babel')

  $('#message').html(html)
  $('#message').append(html2)

})(window))
