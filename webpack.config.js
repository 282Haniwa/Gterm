const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /(\.js|\.jsx)$/,
        loader: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
