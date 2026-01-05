export function renderMainList(appRegistry) {
  const mainList = document.getElementById("main-list");
  mainList.innerHTML = "";
  if (!mainList) return;
  const project = appRegistry.getProject(appRegistry.currentProjectId);
  const projectName = document.createElement("h2");
  projectName.id = "project-name";
  projectName.textContent = project.name;
  mainList.appendChild(projectName);
  const todoList = document.createElement("ul");
  todoList.id = "todo-list";
  project.todos.forEach((todo) => {
    const li = document.createElement("li");
    if (todo.isCompleted) {
      li.classList.add("completed");
    }
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    li.appendChild(checkbox);
    const span = document.createElement("span");
    span.textContent = todo.title;
    li.appendChild(span);
    todoList.appendChild(li);
    li.addEventListener("click", () => {
      todo.toggleCompleted();
      checkbox.checked = todo.isCompleted;
      li.classList.toggle("completed", todo.isCompleted);
      appRegistry.save();
    });
  });
  mainList.appendChild(todoList);
}
