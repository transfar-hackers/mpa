import './style.css'
const messageTemplate = require('./Index.template')
const BasicInfo = require('../../components/BasicInfoComponent/index.js')

$((function(host) {
  const html = messageTemplate({
    author: 'Jack Sparrow'
  })

  console.log(html)
  $('#message').html(html)
    // document.getElementById('message').innerHTML = 'index page'


})(window))
