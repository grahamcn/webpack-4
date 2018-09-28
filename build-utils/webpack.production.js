const path = require('path')
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CleanWebpackPlugin = require('clean-webpack-plugin')

const paths = {
  ROOT: path.resolve(__dirname, '..'),
  DIST: path.resolve(__dirname, '..', 'dist'),
}

// the path(s) that should be cleaned
const pathsToClean = [
  paths.DIST
]

// the clean options to use
let cleanOptions = {
  root: paths.ROOT,
  verbose:  true,
}

module.exports = () =>({
  plugins: [
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
			BASE_API: JSON.stringify('http://www.google.com')
		}),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ]
      }
    ]
  }
})
