'use strict';
const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const plugins = [
  new VueLoaderPlugin(),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
  new VuetifyLoaderPlugin({
    match (originalTag, { kebabTag, camelTag, path, component }) {
      if (kebabTag.startsWith('core-')) {
        return [camelTag, `import ${camelTag} from '@/components/core/${camelTag.substring(4)}.vue'`]
      }
    }
  }),
];
const entry = [
  path.resolve(__dirname, 'app.js'),
];
if (process.env.NODE_ENV !== 'production') {
  entry.push('webpack-hot-middleware/client');
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(new HardSourceWebpackPlugin({
    cacheDirectory: '.cache/[confighash]'
  }));
}
module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, '../../public'),
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ],
            plugins: [
              '@babel/plugin-transform-runtime',
              [ '@babel/plugin-proposal-decorators', { legacy: true } ],
              [ '@babel/plugin-proposal-class-properties', { loose: true } ],
              // [ require('babel-plugin-transform-imports'),
              //   {
              //     "vuetify": {
              //       "transform": "vuetify/es5/components/${member}",
              //       "preventFullImport": true
              //     }
              //   }
              // ]
            ],
          }
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images/',
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(sass)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
                indentedSyntax: true,
              },
            }
          }
        ]
      },
      {
        test: /\.((s|)css)$/,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'vue-style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `
                @import "@/scss/_mixins.scss";
              `,
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers'),
              },
            }
          }
        ]
      },
    ],
  },
  watchOptions: {
    ignored: /node_modules/
  },
  resolve: {
    extensions: [ '.js', '.json', '.vue' ],
    alias: {
      '@': path.resolve(__dirname),
    }
  },
  plugins,
  devServer: {
    contentBase: path.resolve(__dirname, '../../public'),
    hot: true
  }
};
