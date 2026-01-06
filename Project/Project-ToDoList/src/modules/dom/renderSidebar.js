export function renderSidebar(appRegistry) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;
  sidebar.innerHTML = "";
  const projectList = document.createElement("ul");
  projectList.id = "project-list";
  const allProjects = appRegistry.getProjects();
  allProjects.forEach((project) => {
    const li = document.createElement("li");
    li.textContent = project.name;
    li.dataset.id = project.projectId;
    if (project.projectId === appRegistry.currentProjectId) {
      li.classList.add("active");
    }
    projectList.appendChild(li);
  });
  sidebar.appendChild(projectList);
  // 添加项目按钮
  const addProjectButton = document.createElement("button");
  addProjectButton.id = "add-project-button";
  addProjectButton.textContent = "+ 新建清单";
  sidebar.appendChild(addProjectButton);

  // 导出数据按钮
  const exportButton = document.createElement("button");
  exportButton.id = "export-data-btn"; // 注意：CSS 还没写这个 ID 的样式，可以用内联或者是复用样式
  exportButton.textContent = "📥 导出数据";
  exportButton.style.marginTop = "10px";
  exportButton.style.padding = "10px"; // 简单加点样式，或者在 CSS 里统一写
  exportButton.style.width = "100%";
  exportButton.style.color = "#7f8c8d";

  // 简单的 hover 效果通过 CSS 处理更佳，这里暂时内联确保可见
  sidebar.appendChild(exportButton);
}
