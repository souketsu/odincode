// src/about.js

// 导出 loadAbout 函数，用于生成关于页面内容
export function loadAbout() {
  // 1. 创建主容器
  const main = document.createElement("main");
  main.classList.add("about-container");

  // 2. 添加标题
  const title = document.createElement("h1");
  title.textContent = "关于 (About)";
  main.appendChild(title);

  // 3. 添加故事/品牌介绍文本
  const story = document.createElement("p");
  story.textContent =
    "美味餐厅始创于 2024 年，我们致力于用 JavaScript 编写的灵魂，烹饪出数字世界的珍馐。";
  main.appendChild(story);

  // 4. 添加联系信息
  // 这里使用 div 容器而不是 p 标签，因为内部包含了 h2 和多个 p 标签 (HTML 规范要求)
  const contactinfo = document.createElement("div");
  contactinfo.innerHTML = `
        <h2>联系我们</h2>
        <p>📞 电话：123-456-7890</p>
        <p>📍 地址：代码大道 1024 号，Web 开发城</p>
        <p>⏰ 营业时间：周一至周五 9:00 - 22:00</p>
    `;
  main.appendChild(contactinfo);

  // 5. 返回生成的 DOM 元素
  return main;
}
