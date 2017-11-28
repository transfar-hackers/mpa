/**
 *  主要思想是使用eval执行想要的逻辑。以拼接字符的模式来进行逻辑判断理论上可以如同EL表达式一样处理页面上的大部分逻辑。
 *  如：{{#expression a '==' b '&&' c '>' 0}}
 */
module.exports = function() {
  let exps = []
  try {
    //最后一个参数作为展示内容，也就是平时的options。不作为逻辑表达式部分
    let arg_len = arguments.length
    let len = arg_len - 1
    for (let j = 0; j < len; j++) {
      exps.push(arguments[j])
    }
    let result = eval(exps.join(' '))
    if (result) {
      return arguments[len].fn(this)
    } else {
      return arguments[len].inverse(this)
    }
  } catch (e) {
    throw new Error('Handlerbars Helper "expression" can not deal with wrong expression:' + exps.join(' ') + '.')
  }
}
