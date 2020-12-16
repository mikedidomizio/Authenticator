const path = require("path");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  mode: "development",
  entry: {
    test: "./src/test.ts"
  },
  module: {
    rules: [
      {
        // Note that while it is possible to instrument .vue files, it does not produce correct output. Do not show *.vue in coverage reports.
        loader: '@jsdevtools/coverage-istanbul-loader',
        options: { esModules: true },
        include: path.resolve(__dirname, 'src/'),
        exclude: [
          path.resolve(__dirname, 'src/test/'),
          path.resolve(__dirname, 'src/test.ts'),
          path.resolve(__dirname, 'node_modules/'),
        ],
        enforce: "post"
      }
    ],
    // to supress mocha warnings
    exprContextCritical: false,
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
  },
  // dev mode currently only for chrome
  output: {
    path: path.resolve(__dirname, "chrome/dist"),
    publicPath: "/chrome/dist/",
  }
});
