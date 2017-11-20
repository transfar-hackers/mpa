import path from 'path'
import 'babel-polyfill'
import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component

import 'components/LeftNavComponent/index.js'
import basicInfoTemplate from 'components/BasicInfoComponent/index.js'
import headerTemplate from 'components/HeaderComponent/index.js'
import myDialogTemplate from './templates/mydialog.template'
import herosTemplate from './templates/heros.template'

const totalData = require('utilities/mock_data.js').page_data

$((function(host) {
  let $header = $('header')
  headerTemplate.rerender($header)

  let infoHTML = basicInfoTemplate.render()
  let $sparrowElem = $('.j-sparrow')
  $sparrowElem.html(infoHTML)

  // dialog codes
  let $dialogElem = $('.comp-dialog')
  let dialogHTML = myDialogTemplate({
    id: 'myDialog',
    title: 'My Dialog Title',
    name: 'Hola, Jack Sparrow!',
    positive: 'Confirm',
    negative: 'Cancel'
  })
  $dialogElem.html(dialogHTML)

  $('#my-btn').on('click', function() {
    console.log(`you clicked me!`)
  })

  // end of dialog codes

  // pagination codes
  let $heroListElem = $('.hero-list')
  let pageSize = 10
  let pageData = null

  function getPageDataByIndex(pageIndex) {
    let data = totalData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    return data
  }

  let $paginationElem = $('.my-pagination')

  let options = {
    maxPage: totalData.length / pageSize,
    currPage: 0,
    listElem: $heroListElem, // element to show the list
    listTemplate: herosTemplate, // template function
    callback: function(pageIndex) {
      pageData = getPageDataByIndex(pageIndex)
      let html = this.listTemplate({
        heros: pageData
      })

      this.listElem.html(html)
    }
  }

  $paginationElem.pagination(options)
  options.callback(1) // display page 1 by default

  // end of pagination codes

})(window))
