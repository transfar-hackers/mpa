/*
 * this index.js file is only for setup and starting express.js
 * author: j-sparrow
 */
var express = require('express');
var path = require('path');
var debug = require('debug')('express');

var app = express();
var port = 3000;

app.use(express.static(path.join(__dirname, './dist')));

app.listen(port, function () {
  debug(`express is listening on port: ${port}`);
});
