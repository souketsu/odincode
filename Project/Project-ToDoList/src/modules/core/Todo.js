/**
 * Todo 类 - 表示单个待办事项任务
 * 遵循面向对象设计原则，负责管理任务自身的数据和行为
 */
export class Todo {
  /**
   * 创建一个新的 Todo 任务
   * @param {string} title - 任务标题
   * @param {string} description - 任务详细描述
   * @param {string} priority - 优先级 (例如: "High", "Medium", "Low")
   * @param {string|null} dueDate - 截止日期
   */
  constructor(title, description = "", priority = "Low", dueDate = null) {
    this.id = crypto.randomUUID(); // 为任务分配唯一的 UUID
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.isCompleted = false; // 初始状态默认为未完成
    this.projectId = null; // 初始不属于任何特定项目
  }

  /**
   * 切换任务的完成状态 (已完成 <-> 未完成)
   */
  toggleCompleted() {
    this.isCompleted = !this.isCompleted;
  }

  /**
   * 更新任务的详细信息
   * 只更新传入了有效参数的字段
   */
  updateDetails(title, description, priority, dueDate) {
    if (title) this.title = title;
    if (description) this.description = description;
    if (priority) this.priority = priority;
    if (dueDate) this.dueDate = dueDate;
  }

  /**
   * 更新所属项目的 ID
   * @param {string} projectId
   */
  updateProjectId(projectId) {
    this.projectId = projectId;
  }

  /**
   * 静态方法：从 JSON 对象（通常来自 LocalStorage）中恢复 Todo 实例
   * 这是为了找回在序列化过程中丢失的方法（如 toggleCompleted）
   * @param {Object} json - 纯数据对象
   * @returns {Todo} 恢复后的 Todo 类实例
   */
  static fromJSON(json) {
    const todo = new Todo(
      json.title,
      json.description,
      json.priority,
      json.dueDate
    );
    todo.id = json.id; // 保持原有 ID 不变
    todo.isCompleted = json.isCompleted;
    todo.projectId = json.projectId;
    return todo;
  }
}
