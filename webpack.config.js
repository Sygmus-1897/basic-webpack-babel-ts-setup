const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prod = process.env.NODE_ENV === "production";

module.exports = {
  mode: prod ? "production" : "development",
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
		clean: true,
		filename: `[name].[contenthash].bundle.js`,
    path: __dirname + "/dist/",
  },
  module: {
    rules: [
      {
				test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: [".jsx", ".js", ".ts", ".tsx", ".json"],
        },
        use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', ["@babel/preset-react", {"runtime": "automatic"}], "@babel/preset-typescript"],
					}
				}
			},
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  devtool: prod ? undefined : "source-map",
  devServer: {
    port: 3000,
    hot: true,
    open: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin(),
  ],
};
