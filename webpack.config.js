"use strict";

const path = require('path');
const webpack = require('webpack');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  assets: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'public'),
  output: path.join(__dirname, 'public/compiled/')
};

module.exports = {
  entry: {
    vendors: ['react'],
    index: path.join(PATHS.assets, 'index.js'),
    global: path.join(PATHS.assets, 'global'),
  },
  output: {
    path: PATHS.output,
    filename: '[name].js',
    publicPath: '/compiled/'
  },
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    contentBase: PATHS.dist,
    hot: false,
    inline: true,
    progress: true,
    host: 'localhost',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/,
        include: [
          PATHS.assets,
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)(\?.*)?$/,
        use: [
          'file-loader?name=fonts/[name].[ext]',
        ],
        include: [
          PATHS.assets,
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg)(\?.*)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8000,
            name: 'images/[name].[ext]'
          }
        }],
        include: [PATHS.assets],
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1&sourceMap',
            'resolve-url-loader?sourceMap',
            {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, 'node_modules/'),
                  path.resolve(__dirname, 'node_modules@material/*'),
                ],
                sourceMap: true,
              }
            }
          ]
        }),
        include: [
          PATHS.assets,
        ]
      },
      {
        test: /\.css$/,
        // exclude material css from being loaded by CSS modules
        // These paths are specific to your system, so change accordingly
        exclude: [
          path.resolve(__dirname, 'node_modules/material-components-web'),
          path.resolve(__dirname, 'node_modules/@material')
        ],
        use: ['style-loader', 'css-loader?modules=true']
      },
      {
        test: /\.css$/,
        // only turn on standard global CSS loader for the material directories
        // These paths are the same as above and specific to your system, so change accordingly
        include: [
          path.resolve(__dirname, 'node_modules/material-components-web'),
          path.resolve(__dirname, 'node_modules/@material')
        ],
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
};