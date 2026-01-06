const { app, BrowserWindow } = require("electron");
const path = require("path");

// 处理 Windows 安装/卸载时的事件
if (require("electron-squirrel-startup")) return app.quit();

function createWindow() {
  // 创建浏览器窗口
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    // 隐藏默认菜单栏（可选，让界面更像原生应用）
    autoHideMenuBar: true,
  });

  // 加载构建好的 index.html
  // 注意：运行 Electron 前必须先运行 npm run build
  win.loadFile("dist/index.html");

  // 如果你想在开发时使用调试工具，取消下面这行的注释
  // win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
