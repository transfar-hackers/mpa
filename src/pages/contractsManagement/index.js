import 'babel-polyfill'
import './style.css'
import 'styles/app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import favicon from 'styles/images/favicon.ico'
import ContractEditorComponent from 'components/ContractComponent/index.js'
import ContractEditorTemplate from './templates/ContractEditor.template'
import HeaderComponent from 'components/HeaderComponent/index.js'
import BannerComponent from 'components/BannerComponent/index.js'
import MenuComponent from 'components/LeftNavComponent/index.js'
import ContractListTemplate from './templates/contractsList.template'
import TemplateListTemplate from './templates/templateList.template'
import Contracts from 'utilities/mock_data/contractList.json'
import Templates from 'utilities/mock_data/templateList.json'
import http from 'common/http.js'
import ContractModel from './ContractModel.js'

$(function(host) {
  // add favicon --> didn't use webpack-html-plugin to generate favicon
  let $faviconElem = $(`<link rel="shortcut icon" href=${favicon}>`)
  $('head').append($faviconElem)

  // end of add favicon
  MenuComponent.render($('.menu'))
  HeaderComponent.rerender($('.header'))
  BannerComponent.render($('.banner'))

  // initialize the dialog html first(not showing it yet)
  ;
  (function InitializeDialogHTML() {
    let editorHTML = ContractEditorTemplate({
      title: '合同 / 模板在线编辑器',
      id: 'new-editor',
      positive: '保存',
      negative: '取消'
    })
    $('.dialog-anchor').html(editorHTML)
  })()

  // bind events
  $('.btn-new-editor').on('click', ContractModel.PopupEditor)

  // end of dialog codes

  /*
    function CreateContractEditor(selector = '.contract-editor') {
      let editor =
        ContractEditorComponent.init({
          branding: false,
          // selector: '.contract-editor',
          selector: selector,
          skin: false,
          width: 900,
          height: 600,
          images_upload_url: '/treasureWeb/fileUpload/uploadPicture.do',
          plugins: 'advlist autolink link image imagetools lists charmap preview save autoresize',
          toolbar: 'undo redo | styleselect | bold italic | link image',
          theme_advanced_resizing: true,
          theme_advanced_resizing_use_cookie: false,
          setup: function(editor) {}
        })

      return editor
    }

    function PopupEditor(selector = '#new-editor') {
      CreateContractEditor()
      $(`#new-editor`).modal()
    }
  */

  // pagination codes
  let pageSize = 10 // set 10 for testing purpose
  let $contractListElem = $('#contract-list')
  let $contractPaginationElem = $('#contract-list-pagination')
  let $templateListElem = $('#template-list')
  let $templatePaginationElem = $('#template-list-pagination')

  ContractModel.pagination.createPaginationForTemplateList.call(
    ContractModel,
    $templatePaginationElem,
    $templateListElem,
    TemplateListTemplate,
    pageSize
  )

  ContractModel.pagination.createPaginationForContractList.call(
    ContractModel,
    $contractPaginationElem,
    $contractListElem,
    ContractListTemplate,
    pageSize
  )

}(window))
