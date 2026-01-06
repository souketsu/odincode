# Todo List（待办事项清单）项目

这是来自 **The Odin Project**（奥丁项目）中关于 **Todo List（待办事项清单）** 项目的中文翻译指南。

---

## 介绍

到目前为止，你已经对我们展示的各种技术进行了大量的练习。但在我们继续前进之前，我们要花点时间慢下来，完成一个伟大的项目，将这些技术联系在一起。你应该借此机会展示你学到的绝大部分（甚至全部）新技能！

## Todo List 项目

待办事项清单是 Web 开发初学者教程中的必备项目。虽然基本实现很简单，但它有很大的改进空间，并且可以添加许多功能。

在开始编写代码之前，请花一点时间思考一下你打算如何**组织**你的项目。

## 任务安排

1. **对象创建**：你的 “todos” 将是需要动态创建的对象，这意味着你需要使用 **工厂函数 (Factories)** 或 **构造函数/类 (Classes)** 来生成它们。
2. **属性构思**：构思你的 todo 项目将拥有哪些属性。最起码它们应该包含：`title`（标题）、`description`（描述）、`dueDate`（截止日期）和 `priority`（优先级）。你可能还想添加 `notes`（备注）甚至 `checklist`（检查清单）。
3. **项目管理**：你的待办事项清单应该有 `projects`（项目）或独立的清单分类。当用户第一次打开应用时，应该有一个“默认项目”，所有的待办事项都会放在其中。用户应该能够创建新项目，并选择将待办事项放入哪个项目中。
4. **关注点分离**：你应该将**应用逻辑**（如创建新 todo、设置完成状态、更改优先级等）与 **DOM 相关操作** 分离开。请将它们保存在不同的模块中。
5. **界面设计 (UI)**：外观由你决定，但它必须能够实现以下功能：
    1. 查看所有项目。
    2. 查看每个项目中的所有待办事项（可能只需显示标题和截止日期……或许可以根据不同的优先级改变颜色）。
    3. 展开单个待办事项以查看/编辑其详细信息。
    4. 删除待办事项。
6. **参考灵感**：查看以下优秀的待办事项应用（查看截图、观看介绍视频等）：

    1. [Todoist](https://en.todoist.com/)
    2. [Things](https://culturedcode.com/things/)
    3. [any.do](https://www.any.do/)
7. **外部库**：既然你可能已经在使用 **webpack**，那么从 npm 添加外部库就非常简单了！你可以考虑在代码中使用以下实用的库：
    1. [date-fns](https://github.com/date-fns/date-fns)：提供了一系列用于格式化和操作日期与时间的便捷函数。
8. 数据持久化 (Web Storage API)：
    由于我们还没有学习如何将数据存储在远程服务器，因此当用户刷新页面时，所有的待办事项都会消失！你应该使用 localStorage 为这个应用添加持久化功能。
    [localStorage](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API) 允许你将数据保存在用户的电脑上。缺点是数据只能在创建它的那台电脑上访问。即便如此，它依然非常实用！
    - 设置一个函数，在每次创建新项目或待办事项时，将数据保存到 `localStorage`。
    - 设置另一个函数，在应用首次加载时，检查 `localStorage` 中是否存在数据。

    **小贴士：**

    - 确保如果 `localStorage` 中没有数据，你的应用不会崩溃！
    - 你可以使用 **DevTools（开发者工具）** 检查保存的数据！打开 `Application` 面板，点击左侧的 `Local Storage`。每当你添加、更新或删除数据，这些变化都会实时反映在这里。
    - **重要：** `localStorage` 使用 **JSON** 格式存储数据。当你取回数据时，它也是 JSON 格式。请记住，**JSON 中不能存储函数**。因此，当你获取对象后，需要想办法将方法（methods）重新关联到这些对象属性上。祝你好运！

---

## 额外资源

- [在现代应用中使用 Local Storage (FreeCodeCamp)](https://www.freecodecamp.org/news/use-local-storage-in-modern-applications/)：如果你想深入了解，这里提供了更多细节。

---

**你想让我帮你先构思一下这个项目的模块结构（文件夹和文件划分），还是先写一个基础的 Todo 类代码示例？**

---

## 📦 打包与发布指南 (Build & Release)

本项目支持多种打包方式，覆盖 Web、桌面端 (Windows) 和 Android 平台。

### 1. Web 网页版

生成优化后的静态文件，部署到服务器。

```bash
npm run build
# 生成文件位于 ./dist 目录
```

### 2. Windows 桌面版 (绿色免安装)

生成便携式文件夹，解压即用，适合快速分享。

```bash
npm run make
# 生成文件位于 ./out/make/zip/win32/x64/
```

### 3. Windows 桌面版 (安装程序)

生成专业的 `.exe` 安装向导，带有桌面快捷方式。

```bash
npm run dist
# 生成文件位于 ./dist-electron/
```

### 4. Android 安卓版

将 Web 应用封装为原生 APK。

```bash
# 1. 每次修改网页代码后，先重新构建
npm run build

# 2. 同步代码到安卓项目
npx cap sync

# 3. 打开 Android Studio 进行打包 APK
npx cap open android
```

---


## 未来规划 (Roadmap)

- [ ] **数据存储迁移**：从 `localStorage` 迁移到 `IndexedDB`，以支持更大量的数据存储和异步操作。
- [ ] **数据导出/导入**：实现 JSON 格式的数据导出与导入功能。
- [ ] **云同步**：实现多端数据同步功能。
- [ ] **标签系统**：支持给任务添加多重标签。
