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
    // First, run the linter
    /*preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.resolve(process.cwd(), 'src'),
      }
    ],*/
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(process.cwd(), 'src'),
        query: {
          presets: ['react', 'es2015']
        },
        loader: 'babel-loader',
      }, {
        test: /\.scss$/,
        include: path.resolve(process.cwd(), 'src'),
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
}
