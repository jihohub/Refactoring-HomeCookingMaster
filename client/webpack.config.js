const path = require("path")

module.exports = {
  mode: "development",
  devServer: {
    allowedHosts: "auto",
  },
  entry: {
    main: "./src/index.tsx",
  },
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: ["@babel/env", "@babel/preset-react"] },
      },
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader", "sass-loader"],
        use: "css-loader",
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.tsx?/,
        loader: "ts-loader",
        options: {
          compilerOptions: {
            noEmit: false,
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};