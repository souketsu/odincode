import { Todo } from "../core/Todo";
import { Project } from "../core/Project";
import { exportDataAsJSON } from "../storage/exportData"; // 新增导入

export function attachEvents(renderer) {
  // renderer 是 Renderer 的实例，我们通过它访问 appRegistry 和 updateUI

  // 1. 侧边栏交互：切换项目
  document.getElementById("sidebar").addEventListener("click", (e) => {
    const li = e.target.closest("li[data-id]");
    if (li) {
      const id = li.dataset.id;
      renderer.appRegistry.selectProject(id);
      renderer.appRegistry.save();
      renderer.updateUI();

      // 移动端：选择项目后自动关闭侧边栏
      if (window.innerWidth <= 768) {
        document.getElementById("sidebar").classList.remove("open");
        document.getElementById("sidebar-overlay").classList.remove("visible");
      }
    }
  });

  // 2. 主列表交互：切换完成状态、选中任务、删除任务
  document.getElementById("main-list").addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    const todoId = li.dataset.id;

    // 复选框：切换完成状态
    if (event.target.tagName === "INPUT") {
      const todo = renderer.appRegistry.getCurrentProject().getTodo(todoId);
      todo.toggleCompleted();
      renderer.updateUI();
    }

    // 删除按钮
    if (event.target.classList.contains("delete-task-btn")) {
      const todoId = event.target.dataset.todoId;
      const currentProject = renderer.appRegistry.getCurrentProject();
      currentProject.removeTask(todoId);
      renderer.appRegistry.save();
      renderer.updateUI();
    }

    // 点击任务标题：显示详情
    if (event.target.tagName === "SPAN") {
      renderer.selectedTodoId = todoId;
      renderer.updateUI();

      // 移动端：打开详情面板
      document.getElementById("task-detail").classList.add("open");
    }
  });

  // 4.快速添加任务 (回车)
  document.addEventListener("keydown", (e) => {
    if (e.target.id === "add-task-input" && e.key === "Enter") {
      const input = e.target;
      const title = input.value.trim();

      if (title) {
        const newTodo = new Todo(title);
        renderer.appRegistry.getCurrentProject().addTask(newTodo);
        renderer.appRegistry.save();
        renderer.updateUI();

        // 重新聚焦
        setTimeout(() => document.getElementById("add-task-input")?.focus(), 0);
      }
    }
  });

  // 4.快速添加任务 (按钮)
  document.addEventListener("click", (e) => {
    if (e.target.id === "add-task-button") {
      const input = document.getElementById("add-task-input");
      const title = input.value.trim();
      input.value = ""; // 注意：这里先清空了逻辑有点小瑕疵，但不影响

      if (title) {
        const newTodo = new Todo(title);
        renderer.appRegistry.getCurrentProject().addTask(newTodo);
        renderer.appRegistry.save();
        renderer.updateUI();
        setTimeout(() => document.getElementById("add-task-input")?.focus(), 0);
      }
    }
  });

  // 5. 添加新项目
  document.addEventListener("click", (e) => {
    if (e.target.id === "add-project-button") {
      const projectName = prompt("新清单的名称：");

      if (projectName && projectName.trim()) {
        const newProject = new Project(projectName.trim());
        renderer.appRegistry.addProject(newProject);
        renderer.updateUI();
      }
    }
  });

  // 6. 详情面板操作 (保存/关闭)
  document.addEventListener("click", (e) => {
    if (e.target.id === "save-detail-btn") {
      const title = document.getElementById("detail-title").value;
      const description = document.getElementById("detail-description").value;
      const priority = document.getElementById("detail-priority").value;
      const dueDate = document.getElementById("detail-dueDate").value;

      const todo = renderer.appRegistry
        .getCurrentProject()
        .getTodo(renderer.selectedTodoId);

      if (todo) {
        todo.updateDetails(title, description, priority, dueDate);
        renderer.appRegistry.save();
        renderer.updateUI();
      }
    }

    if (e.target.id === "close-detail-btn") {
      renderer.selectedTodoId = null;
      document.getElementById("task-detail").classList.remove("open"); // 移动端关闭动画
      setTimeout(() => renderer.updateUI(), 300); // 等动画播完再清空内容
    }
  });

  // 7. 导出数据功能 (新增)
  document.addEventListener("click", (e) => {
    if (e.target.id === "export-data-btn") {
      exportDataAsJSON();
    }
  });

  // ==========================================
  // 📱 移动端交互 (Mobile Interactions)
  // ==========================================

  // 辅助函数：切换侧边栏状态
  const toggleSidebar = (show) => {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");
    if (show) {
      sidebar.classList.add("open");
      overlay.classList.add("visible");
    } else {
      sidebar.classList.remove("open");
      overlay.classList.remove("visible");
    }
  };

  // 8. 汉堡菜单按钮
  // 注意：这个按钮是动态添加的，所以使用事件委托绑定到 document
  document.addEventListener("click", (e) => {
    if (e.target.id === "mobile-menu-btn") {
      toggleSidebar(true);
    }
    if (e.target.id === "sidebar-overlay") {
      toggleSidebar(false);
    }
  });

  // 9. 更新 UI 后的状态恢复与处理
  // 我们需要在点击任务后，强制打开详情面板的动画类
  // 这一步其实通过修改上面的逻辑来实现更简单
}
