/*
 * this index.js file is only for setup and starting express.js
 * author: j-sparrow
 */
const express = require('express')
const path = require('path')
const debug = require('debug')('express')
const app = express()
const port = 2017

app.use(express.static(path.join(__dirname, './dist')))
app.listen(port, function() {
  debug(`express is listening on port: ${port}`)
})
