// src/home.js

/**
 * 导出 loadHomeHeader 函数，用于生成导航栏
 * 该部分在标签页切换时通常保持不变
 */
export function loadHomeHeader() {
  // 1. 创建 header 元素
  const header = document.createElement("header");
  header.classList.add("home-header");

  // 2. 添加餐厅主要标题
  const title = document.createElement("h1");
  title.textContent = "美味餐厅 (The Odin Kitchen)";
  header.appendChild(title);

  // 3. 创建导航按钮 (主页、菜单、关于)
  // 每个按钮都有唯一的 ID 用于 index.js 中的事件绑定
  const btnHome = document.createElement("button");
  btnHome.textContent = "主页";
  btnHome.id = "home-btn";
  btnHome.classList.add("home-btn");
  header.appendChild(btnHome);

  const btnMenu = document.createElement("button");
  btnMenu.textContent = "菜单";
  btnMenu.id = "menu-btn";
  btnMenu.classList.add("home-btn");
  header.appendChild(btnMenu);

  const btnAbout = document.createElement("button");
  btnAbout.textContent = "关于";
  btnAbout.id = "about-btn";
  btnAbout.classList.add("home-btn");
  header.appendChild(btnAbout);

  return header;
}

/**
 * 导出 loadHomeMain 函数，用于生成首页的具体内容
 */
export function loadHomeMain() {
  // 1. 创建 main 容器
  const main = document.createElement("main");
  main.classList.add("home-container");

  // 2. 添加欢迎标题
  const title = document.createElement("h1");
  title.textContent = "美味餐厅 (The Odin Kitchen)";
  main.appendChild(title);

  // 3. 添加餐厅展示图片
  const image = document.createElement("img");
  image.src =
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=80";
  image.alt = "餐厅外观";
  main.appendChild(image);

  // 4. 添加餐厅介绍文字
  const description = document.createElement("p");
  description.textContent =
    "我们提供世界上最棒的虚拟美味！所有食材均由 JavaScript 动态生成，保证新鲜。";
  main.appendChild(description);

  // 返回生成的 DOM 元素供 index.js 挂载
  return main;
}
