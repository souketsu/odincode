# 餐厅页面项目

这是一份关于 **The Odin Project（奥丁项目）—— 餐厅页面项目** 的中文翻译指南。该项目的核心目标是练习使用 **JavaScript 动态渲染 DOM** 以及使用 **Webpack** 进行模块化开发。

---

## 介绍

让我们利用所学知识，通过动态渲染一个餐厅主页来继续练习 DOM 操作。到最后，你将学会**仅使用 JavaScript** 来生成网站的所有内容！

**注意：DOM 元素应使用 JavaScript 创建，但样式可以在单独的 CSS 文件中完成。**

> 💡.gitignore 文件
>
> 当使用 npm 安装包时，你不需要用 Git 追踪 `node_modules` 的内容，也不需要将其推送到 GitHub。正如我们在 npm 课程中所学，`package.json` 文件包含了所有的依赖信息，任何人克隆你的项目后只需运行 `npm install` 即可安装。
>
> 你可以在项目根目录创建一个 `.gitignore` 文件，写下文件名或目录名，告诉 Git 哪些内容不需要追踪。通常会将 `node_modules` 加入其中。同样，`dist` 文件夹也经常被忽略，因为它可以在运行打包命令时自动生成。
>
> 在GitHub上创建新仓库时，有一个选项可以指定.gitignore模板。有很多模板，包括根据项目类型或使用语言通常不跟踪的常见文件和目录。对于JavaScript项目，有一个node模板，包括node_modules和dist。

---

## 项目任务

1. **初始化项目**：按照 Webpack 教程的方式开始，创建 `package.json` 并配置 Webpack。
    - _注意：只需安装你需要的组件。如果你不打算在 HTML 模板中链接本地图像，则无需安装 `html-loader`。_
2. **创建 .gitignore**：在根目录创建该文件，并输入以下内容：

   ```txt
   node_modules
   dist
   ```

3. **HTML 骨架**：在 `src/template.html` 中设置基础结构。在 `<body>` 中添加一个 `<header>`，包含一个带有多个按钮（**不是链接！**）的 `<nav>`，用于切换“标签页”（例如：首页 Home、菜单 Menu、关于 About）。在 `<header>` 下方添加一个空的 `<div>`。
4. **验证连接**：在 `src/index.js` 中写一个 `console.log` 或 `alert`，运行 `npx webpack serve`。打开 `http://localhost:8080` 检查 JS 是否正常运行。
5. **初步设计**：在 `div#content` 中为餐厅创建主页。可以包括图片、标题和一些介绍文字。现在可以先直接写在 HTML 里看看效果。
6. **转为 JS 渲染**：**现在删除 HTML 中 `div#content` 里的所有内容**（保留 header 和 nav）。改为完全使用 JavaScript 创建这些元素。
    - **进阶**：将初始页面加载函数写在一个独立的模块中，然后在 `index.js` 中导入并调用它。
7. **标签页切换逻辑**：
    - 将每个“标签页”（首页、菜单、联系方式）的内容放在各自的模块中。
    - 每个模块导出一个函数，该函数创建一个 div 元素，添加内容和样式，然后将其附加（append）到 DOM 中。
    - 在 `index.js` 中编写切换逻辑：为导航栏的每个按钮添加事件监听器。点击时，**清空 `div#content` 的当前内容**，然后运行相应的模块函数来重新填充新内容。

---

## 项目部署（GitHub Pages）

将项目部署到 GitHub Pages 会比以前稍微复杂一点，因为 GitHub Pages 默认在项目根目录寻找 `index.html`，而你的文件在 `dist` 文件夹里。

请按照以下步骤操作：

1. **创建分支**：运行 `git branch gh-pages`（仅第一次部署时需要）。
2. **提交代码**：确保所有更改已 `commit`。
3. **同步分支**：运行 `git checkout gh-pages && git merge main --no-edit`。
4. **打包项目**：运行 `npx webpack` 生成最新的 `dist` 文件夹。
5. **推送 dist 内容**：依次运行以下命令：

    ```bash
    git add dist -f && git commit -m "Deployment commit"
    git subtree push --prefix dist origin gh-pages
    git checkout main
    ```

6. **设置 GitHub**：在 GitHub 仓库的 **Settings -> Pages** 中，将 **Source branch** 设置为 `gh-pages`。

---

### 建议的模块结构

为了让你的代码更有条理，你可以参考以下结构：

- `src/index.js` (主入口：处理切换逻辑)
- `src/home.js` (主页内容模块)
- `src/menu.js` (菜单内容模块)
- `src/contact.js` (联系方式模块)

**你想让我帮你写一个基础的 Webpack 配置文件（webpack.config.js）来开启这个项目吗？**
