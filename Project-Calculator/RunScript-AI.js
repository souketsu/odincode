// 使用函数式编程实现计算器

// 全局状态变量
let currentOperand = '0'; // 当前操作数
let previousOperand = ''; // 上一个操作数
let operation = undefined; // 当前操作符
let shouldResetScreen = false; // 是否应该重置屏幕
let displayElement = null; // 显示元素引用

// 初始化计算器
function initCalculator() {
  // 获取DOM元素
  displayElement = document.querySelector('.card');
  
  // 设置事件监听器
  setupEventListeners();
}

// 设置事件监听器
function setupEventListeners() {
  // 数字按钮事件监听
  document.querySelectorAll('[data-input="num"]').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.value));
  });

  // 操作符按钮事件监听
  document.querySelectorAll('[data-input="operator"]').forEach(button => {
    button.addEventListener('click', () => handleOperator(button.value));
  });
}

// 追加数字
function appendNumber(number) {
  // 如果是小数点，检查是否已经存在小数点
  if (number === 'dot' && currentOperand.includes('.')) return;
  
  // 转换小数点的表示
  const actualNumber = number === 'dot' ? '.' : number;
  
  // 如果当前显示为0且不是小数点，则替换
  if (currentOperand === '0' && actualNumber !== '.') {
    currentOperand = actualNumber;
  } 
  // 如果需要重置屏幕
  else if (shouldResetScreen) {
    currentOperand = actualNumber;
    shouldResetScreen = false;
  } 
  // 否则追加数字
  else {
    currentOperand += actualNumber;
  }
  
  updateDisplay();
}

// 处理操作符
function handleOperator(operator) {
  // 如果当前没有操作数，不执行任何操作
  if (currentOperand === '') return;
  
  // 根据不同的操作符执行相应功能
  switch(operator) {
    case 'add':
    case 'subtract':
    case 'multiply':
    case 'divide':
      // 如果有上一个操作数和操作符，先执行之前的计算
      // 这实现了第二次输入操作符时先计算之前的结果
      if (previousOperand !== '' && operation !== undefined) {
        calculate();
        // 计算完成后，将结果设为上一个操作数，保持shouldResetScreen为true
        previousOperand = currentOperand;
        currentOperand = '';
      } 
      // 第一次输入操作符时，保存当前操作数
      else if (previousOperand === '') {
        previousOperand = currentOperand;
        currentOperand = '';
      }
      // 更新操作符
      operation = operator;
      break;
      
    case 'equal':
      if (operation === undefined || previousOperand === '') return;
      calculate();
      operation = undefined;
      previousOperand = '';
      shouldResetScreen = true;
      break;
      
    case 'clear':
      currentOperand = '0';
      break;
      
    case 'all-clear':
      currentOperand = '0';
      previousOperand = '';
      operation = undefined;
      break;
      
    case 'percent':
      currentOperand = (parseFloat(currentOperand) / 100).toString();
      break;
      
    case 'plus-minus':
      currentOperand = (parseFloat(currentOperand) * -1).toString();
      break;
  }
  
  updateDisplay();
}

// 执行计算
function calculate() {
  let computation;
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  
  // 检查是否能进行计算
  if (isNaN(prev) || isNaN(current)) return;
  
  // 根据操作符执行相应的计算
  switch (operation) {
    case 'add':
      computation = prev + current;
      break;
    case 'subtract':
      computation = prev - current;
      break;
    case 'multiply':
      computation = prev * current;
      break;
    case 'divide':
      // 避免除以零错误
      if (current === 0) {
        currentOperand = '错误';
        return;
      }
      computation = prev / current;
      break;
    default:
      return;
  }
  
  // 处理小数精度问题
  currentOperand = formatNumber(computation);
}

// 格式化数字显示
function formatNumber(number) {
  // 处理很大或很小的数字，避免显示科学计数法
  const stringNumber = number.toString();
  const integerDigits = parseFloat(stringNumber.split('.')[0]);
  const decimalDigits = stringNumber.split('.')[1];
  
  let integerDisplay;
  
  if (isNaN(integerDigits)) {
    integerDisplay = '0';
  } else {
    // 添加千位分隔符
    integerDisplay = integerDigits.toLocaleString('zh-CN');
  }
  
  // 处理小数部分
  if (decimalDigits != null) {
    // 限制小数位数，避免过长
    return `${integerDisplay}.${decimalDigits.slice(0, 10)}`;
  } else {
    return integerDisplay;
  }
}



// 更新显示
function updateDisplay() {
  displayElement.textContent = currentOperand;
}
// 页面加载完成后初始化计算器
document.addEventListener('DOMContentLoaded', () => {
  initCalculator();
});
