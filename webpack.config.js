const path = require('path');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: [
          path.resolve(process.cwd(), 'src')
        ],
        query: {
          presets: [["react"]]
        },
        loader: 'babel-loader',
      },
    ],
  },
}
