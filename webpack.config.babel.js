const { resolve } = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');
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
        query: {
          presets: ['es2015', 'es2017'],
        },
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|public\/)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'es2017'],
        },
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
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true,
    },
    output: {
      comments: false,
    },
  }));
  module.exports.plugins.push(new webpack.HashedModuleIdsPlugin());
  module.exports.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
  module.exports.plugins.push(
    new webpack.DefinePlugin(
      { 'process.env.NODE_ENV': JSON.stringify('production') },
    ),
  );
  module.exports.plugins.push(
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );
}

if (process.env.NODE_ENV !== 'production') {
  module.exports.entry.unshift(
    'react-hot-loader/patch',
    'react-hot-loader/babel',
    'webpack-hot-middleware/client',
  );
  module.exports.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}
