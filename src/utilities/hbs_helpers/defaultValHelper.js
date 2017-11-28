import Handlebars from 'handlebars'
/**
 * 设置默认值
 * 如 {{defaultValHelper content '&nbsp;'}}
 * @param {*} val  
 * @param {*} defaultVal 
 */
module.exports = function (val, defaultVal) {
  if (val) {
    return val 
  }
  return new Handlebars.SafeString(defaultVal)
}