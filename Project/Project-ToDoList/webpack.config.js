const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development", // 开发模式，代码不会被压缩，方便调试
  entry: "./src/index.js", // 你的入口文件
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // 每次构件前自动清理 dist 文件夹
  },
  devtool: "inline-source-map", // 报错时能准确指向你的源代码行数，而不是打包后的代码
  devServer: {
    static: "./dist",
    watchFiles: ["./src/template.html"], // 监听 HTML 模板变化
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "TickTick Clone | 滴答清单复刻",
      template: "./src/template.html", // 我们稍后创建这个 HTML 模板
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"], // 允许你直接在 JS 中 import CSS 文件
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource", // 方便处理滴答清单的图标和图片素材
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource", // 滴答清单可能用到自定义字体
      },
    ],
  },
};
