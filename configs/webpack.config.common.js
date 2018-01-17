const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/[hash:8][name].js'
  },
  module: {
    rules: [{
      test: /\.template$/,
      exclude: /node_modules/,
      use: {
        loader: 'handlebars-loader',
        options: {
          helperDirs: [path.resolve(__dirname, '../src/utilities/hbs_helpers')],
          partialDirs: [path.resolve(__dirname, '../src/utilities/hbs_partials')],
          extensions: ['.template']
        }
      }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader?cacheDirectory',
        options: {
          presets: ['env']
        }
      }
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader',
      })
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
    }, {
      test: /\.less$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
    }, {
      test: /\.(cvs|tsv)$/,
      use: ['cvs-loader']
    }, {
      test: /\.xml$/,
      use: ['xml-loader']
    }, {
      test: /\.(png|svg|jpg|gif|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'styles/images/[hash:8][name].[ext]',
          publicPath: '../',
        }
      }]
    }, {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: 'styles/fonts/[hash:8][name].[ext]',
          publicPath: '../'
        }
      }]
    }]
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components/'),
      common: path.resolve(__dirname, '../src/common/'),
      utilities: path.resolve(__dirname, '../src/utilities/'),
      styles: path.resolve(__dirname, '../src/styles/'),
      vendor: path.resolve(__dirname, '../src/vendor')
    }
  },
  node: {
    fs: 'empty'
  }
}
