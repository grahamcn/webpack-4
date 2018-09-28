const webpack = require("webpack")

module.exports = () =>({
  plugins: [
    new webpack.DefinePlugin({
			BASE_API: JSON.stringify('http://www.yahoo.com')
		}),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  }
})
