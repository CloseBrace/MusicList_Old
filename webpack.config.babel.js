const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssOutputLocation = process.env.NODE_ENV === 'production' ?
  'public/stylesheets/style-prod.css' :
  'stylesheets/style.css';

const jsProdOutput = {
  filename: 'public/javascripts/build-prod.js',
  path: resolve(__dirname),
  publicPath: '/',
};

const jsDevOutput = {
  filename: 'javascripts/build.js',
  path: '/',
  publicPath: '/',
};

const jsOutputLocation = process.env.NODE_ENV === 'production' ? jsProdOutput : jsDevOutput;

module.exports = {
  context: resolve(__dirname, 'src'),
  entry: [
    './index.jsx',
  ],
  output: jsOutputLocation,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin(cssOutputLocation),
  ],
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.entry.unshift(
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
  );
  module.exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}
