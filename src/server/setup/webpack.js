const webpack = require('webpack');
const webpackConfig = require('../../client/webpack.config');
const compiler = webpack(webpackConfig);

module.exports = app => {
  app.use(require("webpack-dev-middleware")(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(require("webpack-hot-middleware")(compiler));
};