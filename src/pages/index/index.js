import './style.css'
const messageTemplate = require('./index.handlebars')
const BasicInfo = require('../../components/BasicInfoComponent/index.js')

$((function(host) {
  const html = messageTemplate({
    author: 'j-sparrow'
  })

  $('#message').html(html)
})(window))
