import { Todo } from "./Todo";

/**
 * Project 类 - 表示一个任务清单
 * 负责管理属于该清单的 Todo 任务集合
 */
export class Project {
  /**
   * 创建一个新的项目清单
   * @param {string} name - 清单名称
   */
  constructor(name, isDeletable = true) {
    this.projectId = name === "收集箱" ? "inbox-project" : crypto.randomUUID();
    this.name = name;
    this.todos = [];
    this.isDeletable = isDeletable;
  }

  getTodo(id) {
    return this.todos.find((todo) => todo.id === id);
  }
  /**
   * 向清单中添加一个任务
   * @param {Todo} todo - Todo 类的实例
   */
  addTask(todo) {
    this.todos.push(todo);
    // 双向关联：告诉任务它属于哪个项目
    todo.updateProjectId(this.projectId);
  }

  /**
   * 从清单中移除一个任务
   * @param {string} todoid - 任务的唯一 ID
   */
  removeTask(todoid) {
    this.todos = this.todos.filter((todo) => todo.id !== todoid);
  }

  /**
   * 静态方法：从 JSON 数据中恢复 Project 实例
   * 关键在于将 todos 数组中的纯数据对象重新转换为 Todo 类的实例
   * @param {Object} json
   * @returns {Project}
   */
  static fromJSON(json) {
    const project = new Project(json.name, json.isDeletable);
    project.projectId = json.projectId;
    // 深度恢复：将每个任务数据“复活”为 Todo 实例
    if (json.todos) {
      project.todos = json.todos.map((todoData) => Todo.fromJSON(todoData));
    }
    return project;
  }
}
