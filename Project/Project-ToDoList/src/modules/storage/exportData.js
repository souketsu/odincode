import { loadFromStorage } from "./localStorage";

/**
 * 导出数据为 JSON 文件
 */
export function exportDataAsJSON() {
  const data = loadFromStorage();

  if (!data) {
    alert("暂无数据可导出");
    return;
  }

  const jsonString = JSON.stringify(data, null, 2); // 格式化输出
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  // 创建临时下载链接
  const a = document.createElement("a");
  a.href = url;

  // 生成文件名：todo-backup-yyyy-mm-dd.json
  const date = new Date().toISOString().split("T")[0];
  a.download = `todo-backup-${date}.json`;

  // 触发下载
  document.body.appendChild(a);
  a.click();

  // 清理
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
