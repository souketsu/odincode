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
}
