import 'babel-polyfill'
import './style.css'
import $ from 'jquery'

const favicon = require('styles/images/favicon.ico')
const messageTemplate = require('./Index.template')
import Links from '../../components/LinksComponent/index'

$((function () {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)
  // end of add favicon

  const html = messageTemplate({
    author: 'Jack Sparrow!!!'
  })

  $('#message').html(html)
  Links.render($('#links'))
})())
