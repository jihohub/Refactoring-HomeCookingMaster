const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;

module.exports = {
  mode: "development",
  target: "node",
  devServer: {
    allowedHosts: "auto",
  },
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".css"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader",
          "css-to-mui-loader",
        ],
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
    ],
  },
};