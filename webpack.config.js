const path = require('path');

// ui build root
const buildPath = path.resolve(process.cwd(), 'build');

module.exports = {
  entry: './src/main.jsx',
  output: {
    filename: 'bundle.js',
    path: buildPath
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
