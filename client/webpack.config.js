// based on https://medium.com/@SunnyGolovine/build-a-chrome-extension-using-reactjs-and-webpack-part-1-976a414b85d0
// ... https://github.com/dvidsilva/chrome-ext-sample
// ... https://hackernoon.com/creating-popup-chrome-extensions-that-interact-with-the-dom-27b943978daf
// ... https://medium.com/better-programming/create-a-chrome-extension-using-react-and-typescript-50e94e14320c
// ... https://medium.com/code-words/chrome-extensions-in-react-redux-88111d4c9f63

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const config = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: {
    app: path.join(__dirname, "./src/index.tsx"),
    background: path.join(__dirname, "./chrome/scripts/background.ts"),
    content: path.join(__dirname, "./chrome/scripts/content.ts")
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "[name].js"
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "boilerplate", // change this to your app title
      meta: {
        charset: "utf-8",
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
        "theme-color": "#000000"
      },
      manifest: "manifest.json",
      filename: "index.html",
      template: "./src/index.html",
      hash: true
    }),
    new CopyPlugin([
      {
        from: "chrome/icons",
        to: "icons"
      }
    ]),
    new WebpackExtensionManifestPlugin({
      config: {
        base: baseManifest
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  }
};
module.exports = config;