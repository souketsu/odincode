// src/modules/dom/detailRender.js

/**
 * 渲染任务详情面板
 * @param {AppRegistry} appRegistry
 * @param {string|null} selectedTodoId - 当前选中的任务ID
 */
export function renderTaskDetail(appRegistry, selectedTodoId) {
  const detailPanel = document.getElementById("task-detail");

  // 如果没有选中任务，隐藏或显示提示
  if (!selectedTodoId) {
    detailPanel.innerHTML = `
      <div class="no-task-selected">
        <p>点击任务查看详情</p>
      </div>
    `;
    return;
  }

  // 找到对应的任务
  const currentProject = appRegistry.getCurrentProject();
  const todo = currentProject.getTodo(selectedTodoId);

  if (!todo) {
    detailPanel.innerHTML = "<p>任务不存在</p>";
    return;
  }

  // 渲染任务详情
  detailPanel.innerHTML = `
    <h3>任务详情</h3>
    <div class="detail-field">
      <label>标题：</label>
      <input type="text" id="detail-title" value="${todo.title}" />
    </div>
    <div class="detail-field">
      <label>描述：</label>
      <textarea id="detail-description">${todo.description || ""}</textarea>
    </div>
    <div class="detail-field">
      <label>优先级：</label>
      <select id="detail-priority">
        <option value="High" ${
          todo.priority === "High" ? "selected" : ""
        }>高</option>
        <option value="Medium" ${
          todo.priority === "Medium" ? "selected" : ""
        }>中</option>
        <option value="Low" ${
          todo.priority === "Low" ? "selected" : ""
        }>低</option>
      </select>
    </div>
    <div class="detail-field">
      <label>截止日期：</label>
      <input type="date" id="detail-dueDate" value="${todo.dueDate || ""}" />
    </div>
    <div class="detail-actions">
      <button id="save-detail-btn">保存</button>
      <button id="close-detail-btn">关闭</button>
    </div>
  `;
}
