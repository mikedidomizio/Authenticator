const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const ChromeExtensionReloader  = require('webpack-chrome-extension-reloader');

module.exports = merge(common, {
  mode: "development",
  plugins: [
    new ChromeExtensionReloader()
  ],
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  output: {
    path: path.resolve(__dirname, "chrome/dist"),
    publicPath: "/chrome/dist/"
  }
});
