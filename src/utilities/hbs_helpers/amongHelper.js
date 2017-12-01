module.exports = function(arg1, arg2, options) {
  let arr = arg2.split(','),
    isAmong = arr.indexOf(arg1) !== -1

  // console.log(`arg1: ${arg1}, arg2: ${arg2}, ${arg1} is in ${arg2}? ${isAmong}`)

  if (isAmong) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
