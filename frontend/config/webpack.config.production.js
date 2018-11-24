const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");

const MinifyPlugin = require("babel-minify-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackCdnPlugin = require("webpack-cdn-plugin");

const config = require("./webpack.config.base");

const GLOBALS = {
  "process.env.NODE_ENV": JSON.stringify("production"),
  "process.env.ENDPOINT": JSON.stringify(
    process.env.ENDPOINT || "https://designsystem.hopefully.works/api"
  )
};

module.exports = merge(config, {
  mode: "production",
  entry: {
    main: ["@babel/polyfill", path.join(__dirname, "../src/client.jsx")]
  },
  plugins: [
    new CleanWebpackPlugin(["build/*"], {
      root: path.resolve(__dirname, "..")
    }),
    new CopyWebpackPlugin([
      { from: path.join(__dirname, "../src/public/images"), to: "images" }
    ]),
    new WebpackCdnPlugin({
      modules: {
        react: [
          { name: "react", var: "React", path: "umd/react.production.min.js" },
          {
            name: "react-dom",
            var: "ReactDOM",
            path: "umd/react-dom.production.min.js"
          }
        ]
      },
      publicPath: "/node_modules"
    }),
    new MinifyPlugin({}, { sourceMap: null }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(GLOBALS),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ],
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
});
