import { formatTodoDate, getDateValue } from "../utils/dateHelpers";

export function renderMainList(appRegistry) {
  const mainList = document.getElementById("main-list");
  mainList.innerHTML = "";
  if (!mainList) return;

  const project = appRegistry.getCurrentProject();

  // 1. 项目标题
  const projectName = document.createElement("h2");
  projectName.id = "project-name";
  projectName.textContent = project.name;
  mainList.appendChild(projectName);

  // 2. 添加任务输入区
  const addTaskContainer = document.createElement("div");
  addTaskContainer.id = "add-task-container";

  const addTaskInput = document.createElement("input");
  addTaskInput.type = "text";
  addTaskInput.id = "add-task-input";
  addTaskInput.placeholder = "添加任务...";

  const addTaskButton = document.createElement("button");
  addTaskButton.id = "add-task-button";
  addTaskButton.textContent = "添加任务";

  addTaskContainer.appendChild(addTaskInput);
  addTaskContainer.appendChild(addTaskButton);
  mainList.appendChild(addTaskContainer);

  // 3. 任务列表
  const todoList = document.createElement("ul");
  todoList.id = "todo-list";

  // --- 核心升级：智能排序 ---
  // 规则：未完成在前 > 优先级高在前 > 日期近在前
  const sortedTodos = [...project.todos].sort((a, b) => {
    // 1. 完成状态：未完成的排前面
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    // 2. 优先级：High > Medium > Low
    const priorityValues = { High: 3, Medium: 2, Low: 1 };
    const pA = priorityValues[a.priority] || 1;
    const pB = priorityValues[b.priority] || 1;
    if (pA !== pB) {
      return pB - pA; // 降序
    }
    // 3. 日期：早的排前面
    return getDateValue(a.dueDate) - getDateValue(b.dueDate);
  });

  sortedTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.dataset.id = todo.id;

    // 应用优先级样式
    if (todo.priority) {
      li.classList.add(`priority-${todo.priority}`);
    }
    if (todo.isCompleted) {
      li.classList.add("completed");
    }

    // 复选框
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isCompleted;
    li.appendChild(checkbox);

    // 标题
    const span = document.createElement("span");
    span.textContent = todo.title;
    li.appendChild(span);

    // --- 核心升级：显示日期 ---
    if (todo.dueDate) {
      const dateSpan = document.createElement("small");
      dateSpan.className = "todo-date";
      dateSpan.textContent = formatTodoDate(todo.dueDate);

      // 简单的过期检测（如果是昨天之前）
      if (
        getDateValue(todo.dueDate) < new Date().setHours(0, 0, 0, 0) &&
        !todo.isCompleted
      ) {
        dateSpan.classList.add("overdue");
      }
      li.appendChild(dateSpan);
    }

    // 删除按钮
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-task-btn";
    deleteBtn.textContent = "×";
    deleteBtn.dataset.todoId = todo.id;
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });

  mainList.appendChild(todoList);
}
