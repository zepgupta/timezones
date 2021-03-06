const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/_index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ["latest", "stage-0", "react"],
          plugins: ["transform-runtime"],
        },
        exclude: /node_modules/
      },{
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader?modules',
        ],
      },{
        test: /\.sass$/,
        include: [
          path.resolve(__dirname, 'node_modules')
        ],
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/_index.html',
      hash: false,
      filename: 'index.html',
      minify: { collapseWhitespace: true}
    })
  ],
}

if (process.env==="production") {
  console.log('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  config.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    })
  )
}

module.exports = config
