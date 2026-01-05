import { AppRegistry } from "../core/AppRegistry";
import { renderSidebar } from "./renderSidebar";
import { renderMainList } from "./renderMainList";

export class Renderer {
  constructor() {
    this.appRegistry = AppRegistry.initialize();
  }
  updateUI() {
    renderSidebar(this.appRegistry);
    renderMainList(this.appRegistry);
  }
  init() {
    this.updateUI();
  }
}
