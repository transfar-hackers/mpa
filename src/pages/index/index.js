import './style.css'
const messageTemplate = require('./Index.template')
const BasicInfo = require('../../components/BasicInfoComponent/index.js')

$((function(host) {
  const html = messageTemplate({
    author: 'Jack Sparrow!!!'
  })

  console.log(BasicInfo)

  let html2 = BasicInfo.render()
    // console.log(html2)

  console.log(html)
  $('#message').html(html)
  $('#message').append(html2)

})(window))
