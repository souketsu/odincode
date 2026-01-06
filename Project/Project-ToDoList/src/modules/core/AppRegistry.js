import { Project } from "./Project";
import { loadFromStorage, saveToStorage } from "../storage/localStorage";

export class AppRegistry {
  constructor() {
    this.projects = [];
    this.currentProjectId = "inbox-project";
  }

  static initialize() {
    // 尝试从 LocalStorage 加载
    const savedData = loadFromStorage();
    if (savedData) {
      return AppRegistry.fromJSON(savedData);
    }

    const registry = new AppRegistry();
    const inbox = new Project("收集箱", false); // 不可删除
    registry.addProject(inbox);
    registry.save(); // 立即存一下
    return registry;
  }

  save() {
    saveToStorage(this);
  }

  addProject(project) {
    this.projects.push(project);
    this.save();
  }

  removeProject(projectId) {
    const project = this.getProject(projectId);
    if (project && project.isDeletable) {
      this.projects = this.projects.filter(
        (project) => project.projectId !== projectId
      );
      this.save();
    }
  }

  selectProject(projectId) {
    this.currentProjectId = projectId;
    this.save();
  }

  getProject(projectId) {
    return this.projects.find((project) => project.projectId === projectId);
  }

  getProjects() {
    return this.projects;
  }

  getCurrentProject() {
    return this.getProject(this.currentProjectId);
  }

  static fromJSON(json) {
    const appRegistry = new AppRegistry();
    if (json.currentProjectId) {
      appRegistry.currentProjectId = json.currentProjectId;
    }
    appRegistry.projects = json.projects.map((projectData) =>
      Project.fromJSON(projectData)
    );
    return appRegistry;
  }
}
