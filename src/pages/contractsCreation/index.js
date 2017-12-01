/*
 * filename: ContractModel.js
 * purpose: Contract Model
 * author: j-sparrow
 * date: 2017-11-28
 */

import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import favicon from 'styles/images/favicon.ico'
import HeaderComponent from 'components/HeaderComponent'
import BannerComponent from 'components/BannerComponent'
import MenuComponent from 'components/LeftNavComponent'
import TemplateListTemplate from './templates/templateList.template'
import ContractEditorTemplate from './templates/ContractEditor.template'
import ContractModel from './ContractModel.js'

$(function() {
  // favicon, header, menu, banner
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)
  MenuComponent.render($('.menu'))
  HeaderComponent.rerender($('.header'))
  BannerComponent.render($('.banner'))

  let editorHTML = ContractEditorTemplate({
    title: '合同 / 模板在线编辑器',
    id: 'new-editor',
    positive: '保存',
    negative: '取消'
  })
  $('.dialog-anchor').html('')
  $('.dialog-anchor').html(editorHTML)

  // bind events:

  // save updates on editor
  $('#btn-editor-save').on('click', ContractModel.saveEditor.bind(ContractModel))
  $('#btn-editor-cancel').on('click', ContractModel.cancelEditor.bind(ContractModel))
  // end of binding events

  // pagination codes
  let pageSize = 10 // set 10 for testing purpose
  let $templateListElem = $('#template-list')
  let $templatePaginationElem = $('#template-list-pagination')

  ContractModel.pagination.createPaginationForTemplateList.call(
    ContractModel,
    $templatePaginationElem,
    $templateListElem,
    TemplateListTemplate,
    pageSize
  )
  // end of pagination codes

}())
