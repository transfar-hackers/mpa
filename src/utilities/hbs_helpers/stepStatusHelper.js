/**
 *
 */
module.exports = function (status, index, options) {
  if (status === index) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
