const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build',
    publicPath: '/build/',
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
