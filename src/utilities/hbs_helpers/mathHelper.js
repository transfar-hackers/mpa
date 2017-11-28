/**
 *  支持简单的运算
 *  如: {{mathHelper @index '+' 1}}
 */
module.exports = function() {
  let exps = []
  try {
    let arg_len = arguments.length
    let len = arg_len - 1
    for (let j = 0; j < len; j++) {
      exps.push(arguments[j])
    }
    return eval(exps.join(' '))
  } catch (e) {
    throw new Error('mathHelper出现异常' + exps.join(' ') + '.')
  }
}