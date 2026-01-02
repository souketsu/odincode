// src/menu.js

// 导出 loadMenu 函数，供 index.js 调用
export function loadMenu() {
  // 1. 创建该页面的主容器元素
  const main = document.createElement("main");
  main.classList.add("menu-container");

  // 2. 创建并添加页面大标题
  const title = document.createElement("h1");
  title.textContent = "菜单 (Menu)";
  main.appendChild(title);

  // 3. 定义菜单数据 (数据驱动的思想)
  // 将内容与 HTML 结构分开，方便以后修改或添加新菜品
  const dishes = [
    {
      name: "意大利面",
      price: "48元",
      description: "经典的意大利面，搭配新鲜的番茄酱和芝士。",
      img: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "披萨",
      price: "15元",
      description: "新鲜的番茄酱，搭配各种肉类和蔬菜。",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
    },
    {
      name: "沙拉",
      price: "8元",
      description: "新鲜的蔬菜，搭配橄榄油和醋。",
      img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    },
  ];

  // 4. 遍历菜品数据，为每一道菜生成 HTML 卡片
  dishes.forEach((dish) => {
    // 创建卡片的外层 div
    const dishItem = document.createElement("div");
    dishItem.classList.add("menu-item");

    // 使用模板字符串 (Template Literals) 填充内容
    // 这种方式比 createElement 一个个去 append 要快得多且更易读
    dishItem.innerHTML = `
            <img src="${dish.img}" alt="${dish.name}" style="width: 100%; height: 180px; object-fit: cover; margin-bottom: 15px;">
            <h3>${dish.name} - ${dish.price}</h3>
            <p>${dish.description}</p>
        `;

    // 将生成的卡片添加到主容器中
    main.appendChild(dishItem);
  });

  // ⚠️ 非常重要：必须要返回这个大的容器元素，否则 index.js 拿不到内容
  return main;
}
