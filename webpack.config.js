const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, process.env.TICKET_NAME, 'index.js'),
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
  },
};
