function isRequestSuccessful(res) {
  let bSuccess = false

  try {
    if (res[0] && res[0].code === 0 && res[0].message === '查询成功') {
      bSuccess = true
    }
  } catch (e) {
    console.log(e)
  }

  return bSuccess
}

module.exports = {
  isRequestSuccessful: isRequestSuccessful
}
