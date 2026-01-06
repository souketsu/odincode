import {
  format,
  isToday,
  isTomorrow,
  isThisYear,
  parseISO,
  isValid,
} from "date-fns";
import { zhCN } from "date-fns/locale";

/**
 * 格式化任务日期
 * @param {string} dateString - ISO 格式的日期字符串 (e.g. '2023-10-01')
 * @returns {string} 格式化后的日期文本
 */
export function formatTodoDate(dateString) {
  if (!dateString) return "";

  const date = parseISO(dateString);
  if (!isValid(date)) return "";

  if (isToday(date)) {
    return "今天";
  } else if (isTomorrow(date)) {
    return "明天";
  } else if (isThisYear(date)) {
    return format(date, "M月d日", { locale: zhCN });
  } else {
    return format(date, "yyyy年M月d日", { locale: zhCN });
  }
}

/**
 * 获取日期的时间戳用于排序
 * @param {string} dateString
 * @returns {number}
 */
export function getDateValue(dateString) {
  if (!dateString) return Infinity; // 没有日期的排在最后
  return parseISO(dateString).getTime();
}
