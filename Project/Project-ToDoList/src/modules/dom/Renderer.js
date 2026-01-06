import { AppRegistry } from "../core/AppRegistry";
import { renderSidebar } from "./renderSidebar";
import { renderMainList } from "./renderMainList";
import { attachEvents } from "./eventHandlers";
import { renderTaskDetail } from "./renderTaskDetail";

export class Renderer {
  constructor() {
    this.appRegistry = AppRegistry.initialize();
    this.selectedTodoId = null;
  }
  updateUI() {
    renderSidebar(this.appRegistry);
    renderMainList(this.appRegistry);
    renderTaskDetail(this.appRegistry, this.selectedTodoId);
  }
  init() {
    this.createMobileElements();
    this.updateUI();
    attachEvents(this);
  }

  createMobileElements() {
    // 1. 创建遮罩层 (点击关闭侧边栏)
    if (!document.getElementById("sidebar-overlay")) {
      const overlay = document.createElement("div");
      overlay.id = "sidebar-overlay";
      document.body.appendChild(overlay);
    }

    // 2. 创建移动端菜单按钮
    // 注意：这个按钮需要在主列表区域内可见，或者绝对定位在左上角
    if (!document.getElementById("mobile-menu-btn")) {
      const btn = document.createElement("button");
      btn.id = "mobile-menu-btn";
      btn.innerHTML = "☰";
      // 把它加到 body，通过 CSS 固定定位
      document.body.appendChild(btn);
    }
  }
}
