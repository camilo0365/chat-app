const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const srcPath = path.join(__dirname, 'resources');
const destPath = path.join(__dirname, 'public');

const extractSass = new ExtractTextPlugin({
  filename: 'css/app.css',
  disable: process.env.NODE_ENV === 'development'
});

module.exports = {
  entry: path.join(srcPath, 'js', 'index'),
  output: {
    path: destPath,
    filename: 'js/app.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: ['css-loader', 'sass-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(ttf|eot|otf|svg|woff2?)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
          }
        }
      },
    ],
  },
  plugins: [
    extractSass
  ]
};
