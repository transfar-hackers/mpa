module.exports = function (status1, status2, options) {
  if (status1 === status2) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}
