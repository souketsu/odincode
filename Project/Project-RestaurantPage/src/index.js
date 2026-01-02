// src/index.js

// 1. 导入各页面的内容生成模块
// Webpack 会根据这些导入将不同的 JS 文件打包在一起
import { loadHomeMain, loadHomeHeader } from "./home.js";
import { loadMenu } from "./menu.js";
import { loadAbout } from "./about.js";
import "./style.css"; // 导入 CSS 样式表，Webpack 会自动将其注入到页面中

// 2. 获取 HTML 中的总容器 #content
const content = document.querySelector("#content");

// 3. 初始化页面结构
// 首先加载并添加导航栏 (Header)，它在所有页面中保持不动
content.appendChild(loadHomeHeader());

// 4. 创建一个专门存放动态内容的显示区域容器
// 切换标签页时，我们只需要清空这个容器并载入新内容
const mainDisplay = document.createElement("div");
mainDisplay.id = "main-display";
content.appendChild(mainDisplay);

// 首页启动时默认加载 Home 页面的主内容
mainDisplay.appendChild(loadHomeMain());
// 同时给首页按钮添加一个初始的高亮类名
document.querySelector("#home-btn").classList.add("active-btn");

/**
 * 核心逻辑：标签页切换函数
 * @param {Function} newTabFunction - 要加载的页面的生成函数 (如 loadMenu)
 * @param {string} activeBtn - 当前被点击按钮的 ID，用于切换高亮样式
 */
function switchTab(newTabFunction, activeBtn) {
  // 切换页面时自动回到顶部
  window.scrollTo(0, 0);

  // 第一步：清空当前显示的内容
  mainDisplay.innerHTML = "";

  // 第二步：执行传入的生成函数，并将返回的 DOM 元素挂载到显示区域
  mainDisplay.appendChild(newTabFunction());

  // 第三步：更新导航栏按钮的高亮状态
  // 先移除所有按钮的高亮类，再给当前点击的按钮加上高亮类
  document
    .querySelectorAll(".home-btn")
    .forEach((btn) => btn.classList.remove("active-btn"));

  if (activeBtn) {
    document.querySelector(activeBtn).classList.add("active-btn");
  }
}

// 5. 为导航栏按钮绑定点击事件
document.querySelector("#home-btn").addEventListener("click", () => {
  switchTab(loadHomeMain, "#home-btn");
});

document.querySelector("#menu-btn").addEventListener("click", () => {
  switchTab(loadMenu, "#menu-btn");
});

document.querySelector("#about-btn").addEventListener("click", () => {
  switchTab(loadAbout, "#about-btn");
});
