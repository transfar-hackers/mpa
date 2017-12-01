/*
 * filename: ContractModel.js
 * purpose: Contract Model
 * author: j-sparrow
 * date: 2017-11-23
 */
import http from 'common/http.js'
import {
  isRequestSuccessful
} from 'utilities/helper.js'

// imports for pagination component
import 'styles/pagination.less'
import 'common/base.js'
import 'common/pagination.js'
// end of imports for pagination component
import ContractEditorComponent from 'components/ContractComponent'
import ContractEditorTemplate from './templates/ContractEditor.template'
// imports mock data
import CONTRACTS from 'utilities/mock_data/contractList.json'
import TEMPLATES from 'utilities/mock_data/templateList.json'
// end of imports mock data

module.exports = {
  // the rich text editor
  editor: null,
  /*
  param: {
    "contractName": "test contract",
    "template": "<span>Hi, I'm Jack Sparrow!</span>"
  }
  */
  createTemplate: function(param) {
    return http.ajax({
      url: '/treasureWeb/contract/save.do',
      data: param
    })
  },
  /*
  param: {
    "contractInstanceName": "testContract",
    "treasureBillId": "75",
    "contractContent": "data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIuMDAgNzkyLjAwXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDcyMj4+CnN0cmVhbQowLjIwIHcKMCBHCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKOC4wMCA3NjguMDAgVGQKKEhlbGxvKSBUagpFVApCVAovRjkgMTYgVGYKMTguNCBUTAowLjAwMCBnCk5hTiBOYU4gVGQKKCApIFRqCkVUCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKTmFOIE5hTiBUZAooICkgVGoKRVQKQlQKL0Y5IDE2IFRmCjE4LjQgVEwKMC4wMDAgZwo1Ni4wMCA3NjguMDAgVGQKKFdvcmxkKSBUagpFVAowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSIF0KL0NvdW50IDEKPj4KZW5kb2JqCjUgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjYgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNyAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago4IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS1Cb2xkT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago5IDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXIvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTAgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci1Cb2xkL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjExIDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXItT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxMiAwIG9iago8PC9CYXNlRm9udC9Db3VyaWVyLUJvbGRPYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEzIDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLVJvbWFuL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE0IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTUgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtSXRhbGljL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE2IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGRJdGFsaWMvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTcgMCBvYmoKPDwvQmFzZUZvbnQvWmFwZkRpbmdiYXRzL1R5cGUvRm9udAovRW5jb2RpbmcvU3RhbmRhcmRFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUgovRjQgOCAwIFIKL0Y1IDkgMCBSCi9GNiAxMCAwIFIKL0Y3IDExIDAgUgovRjggMTIgMCBSCi9GOSAxMyAwIFIKL0YxMCAxNCAwIFIKL0YxMSAxNSAwIFIKL0YxMiAxNiAwIFIKL0YxMyAxNyAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMS54LW1hc3RlcikKL0NyZWF0aW9uRGF0ZSAoRDoyMDE3MTEwOTE1MTAzMyswOCcwMCcpCj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA4ODkgMDAwMDAgbiAKMDAwMDAwMjE4MyAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxMTggMDAwMDAgbiAKMDAwMDAwMDk0NiAwMDAwMCBuIAowMDAwMDAxMDM2IDAwMDAwIG4gCjAwMDAwMDExMzEgMDAwMDAgbiAKMDAwMDAwMTIyOSAwMDAwMCBuIAowMDAwMDAxMzMxIDAwMDAwIG4gCjAwMDAwMDE0MTkgMDAwMDAgbiAKMDAwMDAwMTUxMyAwMDAwMCBuIAowMDAwMDAxNjEwIDAwMDAwIG4gCjAwMDAwMDE3MTEgMDAwMDAgbiAKMDAwMDAwMTgwNCAwMDAwMCBuIAowMDAwMDAxODk2IDAwMDAwIG4gCjAwMDAwMDE5OTAgMDAwMDAgbiAKMDAwMDAwMjA4OCAwMDAwMCBuIAowMDAwMDAyNDE5IDAwMDAwIG4gCjAwMDAwMDI1MTAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMAovUm9vdCAxOSAwIFIKL0luZm8gMTggMCBSCj4+CnN0YXJ0eHJlZgoyNjE0CiUlRU9G"
  }
  */
  createContract: function(param) {
    return http.ajax({
      url: '/treasureWeb/contractInstance/save.do',
      data: param
    })
  },
  /*
  param: {
    "pageNo": 1,
    "pageSize": 5
  }
  */
  getTemplates: function(param) {
    return http.ajax({
      url: '/treasureWeb/contract/getAll.do',
      data: param
    })
  },
  /*
	param: {
	  "pageNo": 1,
	  "pageSize": 5
	}
	*/
  getContracts: function(param) {
    return http.ajax({
      url: '/treasureWeb/contractInstance/getSaleContract.do',
      data: param
    })
  },
  /*
  param: {
    "treasureContractId": "1",
    "contractName": "new test1",
    "template": "<p>this is a graph</p>"
  }
  */
  editTemplate: function(param) {
    return http.ajax({
      url: '/treasureWeb/contract/update.do',
      data: param
    })
  },
  /*
  "treasureContractInstanceId": "5",
  "treasureBillId": "1126",
  "contractInstanceName": "asdfasd",
  "contractContent": "data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIuMDAgNzkyLjAwXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDcyMj4+CnN0cmVhbQowLjIwIHcKMCBHCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKOC4wMCA3NjguMDAgVGQKKEhlbGxvKSBUagpFVApCVAovRjkgMTYgVGYKMTguNCBUTAowLjAwMCBnCk5hTiBOYU4gVGQKKCApIFRqCkVUCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKTmFOIE5hTiBUZAooICkgVGoKRVQKQlQKL0Y5IDE2IFRmCjE4LjQgVEwKMC4wMDAgZwo1Ni4wMCA3NjguMDAgVGQKKFdvcmxkKSBUagpFVAowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSIF0KL0NvdW50IDEKPj4KZW5kb2JqCjUgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjYgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNyAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago4IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS1Cb2xkT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago5IDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXIvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTAgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci1Cb2xkL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjExIDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXItT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxMiAwIG9iago8PC9CYXNlRm9udC9Db3VyaWVyLUJvbGRPYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEzIDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLVJvbWFuL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE0IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTUgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtSXRhbGljL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE2IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGRJdGFsaWMvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTcgMCBvYmoKPDwvQmFzZUZvbnQvWmFwZkRpbmdiYXRzL1R5cGUvRm9udAovRW5jb2RpbmcvU3RhbmRhcmRFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUgovRjQgOCAwIFIKL0Y1IDkgMCBSCi9GNiAxMCAwIFIKL0Y3IDExIDAgUgovRjggMTIgMCBSCi9GOSAxMyAwIFIKL0YxMCAxNCAwIFIKL0YxMSAxNSAwIFIKL0YxMiAxNiAwIFIKL0YxMyAxNyAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMS54LW1hc3RlcikKL0NyZWF0aW9uRGF0ZSAoRDoyMDE3MTEwOTE1MTAzMyswOCcwMCcpCj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA4ODkgMDAwMDAgbiAKMDAwMDAwMjE4MyAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxMTggMDAwMDAgbiAKMDAwMDAwMDk0NiAwMDAwMCBuIAowMDAwMDAxMDM2IDAwMDAwIG4gCjAwMDAwMDExMzEgMDAwMDAgbiAKMDAwMDAwMTIyOSAwMDAwMCBuIAowMDAwMDAxMzMxIDAwMDAwIG4gCjAwMDAwMDE0MTkgMDAwMDAgbiAKMDAwMDAwMTUxMyAwMDAwMCBuIAowMDAwMDAxNjEwIDAwMDAwIG4gCjAwMDAwMDE3MTEgMDAwMDAgbiAKMDAwMDAwMTgwNCAwMDAwMCBuIAowMDAwMDAxODk2IDAwMDAwIG4gCjAwMDAwMDE5OTAgMDAwMDAgbiAKMDAwMDAwMjA4OCAwMDAwMCBuIAowMDAwMDAyNDE5IDAwMDAwIG4gCjAwMDAwMDI1MTAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMAovUm9vdCAxOSAwIFIKL0luZm8gMTggMCBSCj4+CnN0YXJ0eHJlZgoyNjE0CiUlRU9G"
  */
  editContract: function(param) {
    return http.ajax({
      url: '/treasureWeb/contractInstance/update.do',
      data: param
    })
  },
  /*
  id: id of template to delete
  */
  deleteTemplate: function(id) {
    return http.ajax({
      url: '/treasureWeb/contract/delete.do',
      data: {
        "treasureContractId": id
      }
    })
  },
  /*
  id: id of contract to delete
  */
  deleteContract: function(id) {
    return http.ajax({
      url: '/treasureWeb/contractInstance/delete.do',
      data: {
        "treasureContractInstanceId": id
      }
    })
  },

  pagination: {
    /*
     * $pElem: jQuery element for pagination
     * $lElem: jQuery element for template list
     * template: handlebars template for template list
     * pageSize: how many records per page
     */
    createPaginationForTemplateList: function($pElem, $lElem, template, pageSize) {
      this.getTemplates({ // only to get totalCount
        "pageNo": 1,
        "pageSize": pageSize
      }).then((res) => {
        let bSuccess = isRequestSuccessful(res)
        if (bSuccess) {
          // construct pagination options
          this.templatePaginator = {
            maxPage: res[0].totalCount / pageSize + 1,
            currPage: 0,
            callback: (pageIndex) => {
              this.getTemplates({
                "pageNo": pageIndex,
                "pageSize": pageSize
              }).then((res) => {
                let templates = res[0].data
                let html = template({
                  templateList: templates
                })
                $lElem.html(html)

                $('.template-view').on('click', (e) => {
                  console.log(templates)
                  this.viewTemplate(e, templates)
                })

                $('.template-edit').on('click', (e) => {
                  this.viewTemplate(e, templates)
                  console.log(`go to page: ${pageIndex}`)
                })

                $('.template-delete').on('click', (e) => {
                  // this.deleteTemplate.call(this, e, templates)
                  let templateId = $(event.target).closest('label').attr('x-templateId')
                  this.deleteTemplate(templateId).then(res => {
                    alert('deletion succeeded')
                    this.templatePaginator.callback(pageIndex)
                  }, err => {})
                })

                this.templatePaginator.currentPageNo = pageIndex
              }, (err) => {})
            }
          }

          // render pagination UI
          $pElem.pagination(this.templatePaginator)
          this.templatePaginator.currentPageNo = 1
          this.templatePaginator.callback(this.templatePaginator.currentPageNo) // display page 1 by default
        }
      }, (err) => {})
    },
    /*
     * $pElem: jQuery element for pagination
     * $lElem: jQuery element for contract list
     * template: handlebars template for contract list
     */
    createPaginationForContractList: function($pElem, $lElem, template, pageSize) {
      this.getContracts({ // only to get totalCount
        "pageNo": 1,
        "pageSize": pageSize
      }).then((res) => {
        let bSuccess = isRequestSuccessful(res)
        if (bSuccess) {
          // construct pagination options
          this.contractPaginator = {
            maxPage: res[0].totalCount / pageSize + 1,
            currPage: 0,
            listElem: $lElem,
            listTemplate: template,
            callback: (pageIndex) => {
              this.getContracts({
                "pageNo": pageIndex,
                "pageSize": pageSize
              }).then((res) => {
                let contracts = res[0].data
                let html = template({
                  contracts: contracts
                })
                $lElem.html(html)

                $('.contract-view').on('click', (e) => {
                  this.viewContract.call(this, e, contracts)
                })

                $('.contract-edit').on('click', (e) => {
                  this.editCurrentContract.call(this, e, contracts)
                  this.contractPaginator.callback(pageIndex)
                })

                $('.contract-delete').on('click', (e) => {
                  let contractId = $(event.target).closest('label').attr('x-contractId')
                  this.deleteContract(contractId).then(res => {
                    console.log(res)
                    console.log(`I'm deleting this contract: ${contractId}`)
                    if (res[0].code == 0) {
                      this.contractPaginator.callback(pageIndex)
                      alert(`deletion succeeded`)
                    } else {
                      alert(`deletion failed: ${res[0].message}`)
                    }

                  }, err => {})
                })
              }, (err) => {})
            }
          }

          // render pagination UI
          $pElem.pagination(this.contractPaginator)
          this.contractPaginator.currentPageNo = 1
          this.contractPaginator.callback(this.contractPaginator.currentPageNo) // display page 1 by default
        }
      }, (err) => {})
    },

    getTemplatesByIndex: function(pageIndex) {
      let pageSize = 10
      let data = TEMPLATES.data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)

      return Promise.resolve(data)
    },

    getContractsByIndex: function(pageIndex) {
      let pageSize = 10
      let data = CONTRACTS.data.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)

      return Promise.resolve(data)
    }
  },

  viewContract: function(event, contracts) {
    let contractId = $(event.target).closest('label').attr('x-contractId')
    let contract = this.getContractById(contracts, contractId)

    window.open(contract.contractInstanceUrl)
  },

  viewTemplate: function(event, templates) {
    let templateId = $(event.target).closest('label').attr('x-templateId')

    console.log(`viewing this template: `)
    console.log(this.getTemplateById(templates, templateId))

    console.log(`before asigining: `)
    this.currentTemplate = this.getTemplateById(templates, templateId)
    this.currentContract = null
    this.popupEditor(event, 'new-editor')
  },

  editCurrentContract: function(event, contracts) {
    let contractId = $(event.target).closest('label').attr('x-contractId')
    this.currentTemplate = null
    this.currentContract = this.getContractById(contracts, contractId)

    console.log(`I'm editing this contract: `)
    console.log(this.currentContract)

    this.popupEditor(event, 'new-editor')
  },

  getTemplateById: function(templates, id) {
    let template = null
    for (let i = 0; i < templates.length; i += 1) {
      if (templates[i].treasureContractId == id) {
        return templates[i]
      }
    }
  },

  getContractById: function(contracts, id) {
    let contract = null
    for (let i = 0; i < contracts.length; i += 1) {
      if (contracts[i].treasureContractInstanceId == id) {
        return contracts[i]
      }
    }
  },

  CreateContractEditor: function(selector = '.contract-editor', content = '<div>Testing Conent</div>') {
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

    return ContractEditorComponent
  },

  popupEditor: function(event, selector = 'new-editor') {
    if (this.editor === null) {
      // avoid initializing multiple dialogs
      this.editor = this.CreateContractEditor()
    }

    console.log(`this in popupEditor: `)
    console.log(this)

    let $tbxName = $('#tbx-name')

    if (this.currentTemplate) {
      this.editor.get('contract-content').setContent(this.currentTemplate.template)
      $tbxName.val(this.currentTemplate.contractName)
      console.log(`updating existing template: ${this.currentTemplate.contractName}`)
    } else if (this.currentContract) {
      this.editor.get('contract-content').setContent(this.currentContract.contractInstanceHTML)
      $tbxName.val(this.currentContract.contractInstanceName)
      console.log(`working on existing contract: ${this.currentContract.contractInstanceName}`)
    } else {
      console.log(`creating new template`)
      this.editor.get('contract-content').setContent('')
      $tbxName.val('')
    }

    $('#' + selector).modal()
  },

  saveEditor: function() {
    // envent handler: click 'Save' button
    let newContent = this.editor.get('contract-content').getContent(),
      $tbxName = $('#tbx-name'),
      treasureBillId = http.getUrlParam('sellId'),
      pageNo = http.getUrlParam('pageNo')
    if (treasureBillId) {
      let contractInstanceName = $tbxName.val()
      let contractInstanceHTML = newContent
        // let contractContent = 'data:application/pdf;base64,JVBERi0xLjMKMyAwIG9iago8PC9UeXBlIC9QYWdlCi9QYXJlbnQgMSAwIFIKL1Jlc291cmNlcyAyIDAgUgovTWVkaWFCb3ggWzAgMCA2MTIuMDAgNzkyLjAwXQovQ29udGVudHMgNCAwIFIKPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDcyMj4+CnN0cmVhbQowLjIwIHcKMCBHCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKOC4wMCA3NjguMDAgVGQKKEhlbGxvKSBUagpFVApCVAovRjkgMTYgVGYKMTguNCBUTAowLjAwMCBnCk5hTiBOYU4gVGQKKCApIFRqCkVUCjAuMDAgMC4wMCAwLjAwIHJnCjAuMDAgMC4wMCAwLjAwIFJHCjAgSgoxLjAwIHcKMCBqCjAuMDAgMC4wMCAwLjAwIHJnCkJUCi9GOSAxNiBUZgoxOC40IFRMCjAuMDAwIGcKTmFOIE5hTiBUZAooICkgVGoKRVQKQlQKL0Y5IDE2IFRmCjE4LjQgVEwKMC4wMDAgZwo1Ni4wMCA3NjguMDAgVGQKKFdvcmxkKSBUagpFVAowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagowLjAwIDAuMDAgMC4wMCByZwowLjAwIDAuMDAgMC4wMCBSRwowIEoKMS4wMCB3CjAgagplbmRzdHJlYW0KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZSAvUGFnZXMKL0tpZHMgWzMgMCBSIF0KL0NvdW50IDEKPj4KZW5kb2JqCjUgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjYgMCBvYmoKPDwvQmFzZUZvbnQvSGVsdmV0aWNhLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKNyAwIG9iago8PC9CYXNlRm9udC9IZWx2ZXRpY2EtT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago4IDAgb2JqCjw8L0Jhc2VGb250L0hlbHZldGljYS1Cb2xkT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iago5IDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXIvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTAgMCBvYmoKPDwvQmFzZUZvbnQvQ291cmllci1Cb2xkL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjExIDAgb2JqCjw8L0Jhc2VGb250L0NvdXJpZXItT2JsaXF1ZS9UeXBlL0ZvbnQKL0VuY29kaW5nL1dpbkFuc2lFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoxMiAwIG9iago8PC9CYXNlRm9udC9Db3VyaWVyLUJvbGRPYmxpcXVlL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjEzIDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLVJvbWFuL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE0IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGQvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTUgMCBvYmoKPDwvQmFzZUZvbnQvVGltZXMtSXRhbGljL1R5cGUvRm9udAovRW5jb2RpbmcvV2luQW5zaUVuY29kaW5nCi9TdWJ0eXBlL1R5cGUxPj4KZW5kb2JqCjE2IDAgb2JqCjw8L0Jhc2VGb250L1RpbWVzLUJvbGRJdGFsaWMvVHlwZS9Gb250Ci9FbmNvZGluZy9XaW5BbnNpRW5jb2RpbmcKL1N1YnR5cGUvVHlwZTE+PgplbmRvYmoKMTcgMCBvYmoKPDwvQmFzZUZvbnQvWmFwZkRpbmdiYXRzL1R5cGUvRm9udAovRW5jb2RpbmcvU3RhbmRhcmRFbmNvZGluZwovU3VidHlwZS9UeXBlMT4+CmVuZG9iagoyIDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNSAwIFIKL0YyIDYgMCBSCi9GMyA3IDAgUgovRjQgOCAwIFIKL0Y1IDkgMCBSCi9GNiAxMCAwIFIKL0Y3IDExIDAgUgovRjggMTIgMCBSCi9GOSAxMyAwIFIKL0YxMCAxNCAwIFIKL0YxMSAxNSAwIFIKL0YxMiAxNiAwIFIKL0YxMyAxNyAwIFIKPj4KL1hPYmplY3QgPDwKPj4KPj4KZW5kb2JqCjE4IDAgb2JqCjw8Ci9Qcm9kdWNlciAoanNQREYgMS54LW1hc3RlcikKL0NyZWF0aW9uRGF0ZSAoRDoyMDE3MTEwOTE1MTAzMyswOCcwMCcpCj4+CmVuZG9iagoxOSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwovUGFnZXMgMSAwIFIKL09wZW5BY3Rpb24gWzMgMCBSIC9GaXRIIG51bGxdCi9QYWdlTGF5b3V0IC9PbmVDb2x1bW4KPj4KZW5kb2JqCnhyZWYKMCAyMAowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDA4ODkgMDAwMDAgbiAKMDAwMDAwMjE4MyAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxMTggMDAwMDAgbiAKMDAwMDAwMDk0NiAwMDAwMCBuIAowMDAwMDAxMDM2IDAwMDAwIG4gCjAwMDAwMDExMzEgMDAwMDAgbiAKMDAwMDAwMTIyOSAwMDAwMCBuIAowMDAwMDAxMzMxIDAwMDAwIG4gCjAwMDAwMDE0MTkgMDAwMDAgbiAKMDAwMDAwMTUxMyAwMDAwMCBuIAowMDAwMDAxNjEwIDAwMDAwIG4gCjAwMDAwMDE3MTEgMDAwMDAgbiAKMDAwMDAwMTgwNCAwMDAwMCBuIAowMDAwMDAxODk2IDAwMDAwIG4gCjAwMDAwMDE5OTAgMDAwMDAgbiAKMDAwMDAwMjA4OCAwMDAwMCBuIAowMDAwMDAyNDE5IDAwMDAwIG4gCjAwMDAwMDI1MTAgMDAwMDAgbiAKdHJhaWxlcgo8PAovU2l6ZSAyMAovUm9vdCAxOSAwIFIKL0luZm8gMTggMCBSCj4+CnN0YXJ0eHJlZgoyNjE0CiUlRU9G'
      this.createContract({
          treasureBillId,
          contractInstanceName,
          contractInstanceHTML,
          // contractContent
        })
        .then((res) => {
          let result = res[0]
          if (result.code === -1) {
            return alert(result.message)
          }
          window.location.href = `../sellOrders/index.html?pageNo=${pageNo}`
        })
    }
  },

  // function used to handle click event of the Cancel button on Editor,
  // and reset current template / current contract to null
  cancelEditor: function(event) {
    this.currentTemplate = null
    this.currentContract = null
  },

  currentTemplate: null, // the current template object the editor is working on
  currentContract: null, // the current contract object the editor is working on
  templatePaginator: null, // paginator for template list
  contractPaginator: null // paginator for contract list
}
