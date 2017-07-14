const path = require('path');

// ui build root
const uiBuildPath = path.resolve(process.cwd(), 'build');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(uiBuildPath, '')
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: [
          path.resolve(process.cwd(), 'src')
        ],
        query: {
          presets: [["react-app"]]
        },
        loader: 'babel-loader',
      },
    ],
  },
}
