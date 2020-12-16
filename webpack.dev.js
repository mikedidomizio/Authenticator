const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    // dev mode currently only for chrome
    output: {
        path: path.resolve(__dirname, "chrome/dist"),
        publicPath: "/chrome/dist/"
    }
});
