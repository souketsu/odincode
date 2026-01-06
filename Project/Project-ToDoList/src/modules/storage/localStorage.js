const storageKey = "todo-app-data";

/**
 * 保存数据到 LocalStorage
 * @param {Object} data - 要保存的数据对象
 */

export function saveToStorage(data) {
  try {
    const jsonString = JSON.stringify(data);
    localStorage.setItem(storageKey, jsonString);
  } catch (error) {
    console.error("保存数据失败:", error);
    // 可能是 localStorage 空间已满
    alert("存储空间不足，部分数据可能未保存");
  }
}

/**
 * 从 LocalStorage 加载数据
 * @returns {Object|null} 解析后的数据对象，如果不存在则返回 null
 */
export function loadFromStorage() {
  try {
    const jsonString = localStorage.getItem(storageKey);
    return jsonString ? JSON.parse(jsonString) : null;
  } catch (error) {
    console.error("加载数据失败:", error);
    // JSON 解析失败，可能数据损坏
    return null;
  }
}
/**
 * 清除所有存储的数据
 */
export function clearStorage() {
  localStorage.removeItem(storageKey);
}
/**
 * 检查是否有存储的数据
 * @returns {boolean}
 */
export function hasStoredData() {
  return localStorage.getItem(storageKey) !== null;
}
