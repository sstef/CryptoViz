const path = require('path');

module.exports = {
  context: __dirname,
  entry: './lib/entry.js',
  output: {
    path: path.resolve(__dirname, 'lib', 'app'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-map',
};
