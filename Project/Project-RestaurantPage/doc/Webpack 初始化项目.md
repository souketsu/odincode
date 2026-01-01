# Webpack 初始化项目

没问题，初始化项目是迈向开发者第一步的关键。对于这个 Webpack 项目，我们可以把初始化分成四个简单的步骤。

你可以打开终端（Terminal），确保已经在你的项目文件夹 Project-RestaurantPage 目录下，然后跟着我操作：

## 生成项目说明书 (package.json)

首先，我们需要一个文件来记录项目用到了哪些工具。 在终端输入：

```powershell
npm init -y
```

这会生成一个 package.json 文件。

## 安装 Webpack “三剑客”

我们需要安装 Webpack 及其相关工具。这些工具只会用在开发阶段，所以我们加一个 -D (save-dev) 参数。 在终端输入：

```powershell
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin -D
```

- webpack: 核心打包器。
- webpack-cli: 让你可以用命令行运行 webpack。
- webpack-dev-server: 提供一个自动刷新的本地预览服务器。
- html-webpack-plugin: 自动帮你生成 HTML 文件并把 JS 连接进去。

## 创建文件结构

你需要手动创建以下文件夹和文件，这是 Webpack 默认寻找代码的地方：

- 新建一个文件夹 src。
- 在 src 里面创建两个文件：
  - index.js (你的 JS 入口)
  - template.html (你的 HTML 模板)

## 创建 Webpack 配置文件

在你的项目根目录下（和 package.json 同级），新建一个名为 webpack.config.js 的文件。

这个文件的基本逻辑是告诉 Webpack：

- Entry (入口): 从哪个文件开始读？（通常是 ./src/index.js）
- Plugins (插件): 使用 HtmlWebpackPlugin 并指定模板为 ./src/template.html。
- Dev Server: 设置开发服务器的一些配置（比如让它打开浏览器）。
