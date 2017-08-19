const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(ROOT_PATH, 'src/main.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(ROOT_PATH, 'build'),
    publicPath: '/build',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(process.cwd(), 'src')
        ],
        query: {
          presets: ['react', 'es2015']
        },
        loader: 'babel-loader',
      },
    ],
  },
}
