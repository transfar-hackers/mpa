var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    jquery: ['jquery'],
    bootstrap: ['bootstrap/dist/js/bootstrap.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/vendor'),
    library: 'vendor_lib'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: path.resolve(__dirname, '../dist/vendor/vendor-manifest.json')
    })
  ]
}
