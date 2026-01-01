// src/index.js
import loadHome from "./home.js";

const content = document.querySelector("#content");

// 执行函数并将返回的 DOM 元素放入页面
content.appendChild(loadHome());
