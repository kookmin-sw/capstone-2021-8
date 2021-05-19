const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  context: __dirname,
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        // node_modules - only babel, no eslint
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
        ],
        use: ['babel-loader'],
      }, {
        // project files - babel + eslint
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, './src/'),
        ],
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)?$/,
        use: ['file-loader'],
      },
      {
        test: /react-spring/,
        sideEffects: true,
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
  ],
};
