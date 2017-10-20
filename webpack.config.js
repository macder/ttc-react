const path = require('path');
const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  entry: path.resolve(ROOT_PATH, 'src/index.jsx'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(ROOT_PATH, 'build'),
    publicPath: '/build',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    loaders: [
      /*{
        test: /\.js$/,
        include: path.resolve(process.cwd(), 'src'),
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader'
      }, */
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(process.cwd(), 'src'),
        query: {
          presets: ['react', 'es2015', 'stage-2']
        },
        loader: 'babel-loader',
      },
      {
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
