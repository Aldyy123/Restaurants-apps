const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default
const ImageminMozjpeg = require('imagemin-mozjpeg')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|jpe?g|gif|json)$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }]
    },
    {
      test: /\.json$/,
      exclude: /(node_modules)/,
      loader: 'json-loader',
      type: 'javascript/auto'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/public/'),
        to: path.resolve(__dirname, 'dist/')
      }]
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, './src/scripts/sw.js')
    }),
    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 50,
          progressive: true
        })
      ]
    }),
    // new BundleAnalyzerPlugin()
  ]
}
