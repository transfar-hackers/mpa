var webpack = require('webpack')
var path = require('path')

module.exports = {
  entry: {
    vendor: [path.resolve(__dirname, '../src/vendor/dev/jquery.js'),
      path.resolve(__dirname, '../src/vendor/dev/bootstrap/dist/js/bootstrap.js')
    ]
  },
  output: {
    filename: 'vendor.bundle.js',
    path: path.resolve(__dirname, '../dist/vendor'),
    library: 'vendor_lib'
  },
  plugins: [new webpack.DllPlugin({
    name: 'vendor_lib',
    path: './dist/vendor/vendor-manifest.json'
  })]
}
