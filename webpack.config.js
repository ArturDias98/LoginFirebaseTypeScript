const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    'index':"./src/index.ts",
    'register':"./src/register.ts",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    emitOnErrors: false,
  },
  devtool: 'inline-source-map',
  plugins: [new ForkTsCheckerWebpackPlugin()],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "public", "dist"),
  },
};
