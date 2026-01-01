// src/home.js
export default function loadHome() {
  const container = document.createElement("div");
  container.classList.add("home-container");

  // 1. 添加标题
  const title = document.createElement("h1");
  title.textContent = "美味餐厅 (The Odin Kitchen)";
  container.appendChild(title);

  // 2. 添加图片 (这里你可以先找一个网上的图片地址)
  const image = document.createElement("img");
  image.src =
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80";
  image.alt = "餐厅外观";
  image.style.width = "400px"; // 暂时用 JS 给个宽度
  container.appendChild(image);

  // 3. 添加描述文字
  const description = document.createElement("p");
  description.textContent =
    "我们提供世界上最棒的虚拟美味！所有食材均由 JavaScript 动态生成，保证新鲜。";
  container.appendChild(description);

  return container; // 非常重要：返回这个大盒子
}
