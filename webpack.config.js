const HtmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require("webpack")
const webpackMerge = require('webpack-merge')
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env)
const applyPresets = require('./build-utils/applyPresets')

// return a function with default values that returns a webpack config object
module.exports = ({mode = "production", presets = []}) => {
  return webpackMerge(
    {
      mode,
      entry: {
        filename: './src/main.ts'
      },
      output: {
        filename: 'bundle.js'
      },
      plugins: [
        new HtmlWebPackPlugin({template: './src/index.html'}),
        new webpack.ProgressPlugin(),
      ],
      module: {
        rules: [{
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            'ts-loader',
          ],
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'file-loader'
          ]
        }, {
          test: /\.(png)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 4092
            },
          }]
        }]
      },
      resolve: {
        extensions: ['.js', '.ts'],
      },
    },
    modeConfig(mode),
    applyPresets({mode, presets}),

  )
}
