var webpack = require('webpack')
var path = require('path')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    libs: ['jquery/dist/jquery.min.js', 'bootstrap/dist/js/bootstrap.min.js', 'popper.js/dist/popper.min.js']
      // libs: ['jquery', 'bootstrap', 'popper.js']
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist/vendor'),
    library: 'vendor_lib'
  },
  plugins: [
    new webpack.DllPlugin({
      name: 'vendor_lib',
      path: path.resolve(__dirname, '../dist/vendor/vendor_manifest.json')
    }),
    new UglifyJSPlugin()
  ]
}
