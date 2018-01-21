import 'babel-polyfill'
import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component

import basicInfoTemplate from 'components/BasicInfoComponent'
import myDialogTemplate from './templates/mydialog.template'
import herosTemplate from './templates/heros.template'
import MessageTemplate from './templates/Message.template'

$((function () {

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

  $('#my-btn').on('click', function () {
    console.log('you clicked me!')
  })

  $('#myDialog').on('hide.bs.modal', function (e) {
    console.log(`I'm about to hide`)
    e.stopImmediatePropagation()

    console.log(e)
  })

  // end of dialog codes

  // pagination codes
  /*
  let $heroListElem = $('.hero-list')
  let pageSize = 10

  function getPageDataByIndex(pageIndex) {
    let data = totalData.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)
    return Promise.resolve(data)
  }

  let $paginationElem = $('.my-pagination')

  let options = {
    maxPage: totalData.length / pageSize + 1,
    currPage: 0,
    listElem: $heroListElem, // element to show the list
    listTemplate: herosTemplate, // template function
    callback: function(pageIndex) {
      getPageDataByIndex(pageIndex).then((pageData) => {
          let html = this.listTemplate({
            heros: pageData
          })
          this.listElem.html(html)
        },
        function(error) {
          console.log(error)
        })
    }
  }

  $paginationElem.pagination(options)
  options.callback(1) // display page 1 by default
*/
  // end of pagination codes


  let messageHTML = MessageTemplate()
  $('.message').html(messageHTML)
})(window))
