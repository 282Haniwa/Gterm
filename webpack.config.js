const path = require('path')

module.exports = {
  mode: 'development',
  target: 'electron-renderer',
  entry: path.resolve(__dirname, './src/renderer/index.jsx'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'app.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src/renderer')
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
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader'
      }
    ]
  },
  externals: ['electron']
}
