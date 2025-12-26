// 全局变量
let currentOperand = "0"; // 当前操作数
let previousOperand = ""; // 上一个操作数
let operation = undefined; // 当前操作符
let shouldResetScreen = false; // 是否需要重置屏幕
let displayElement = null; // 显示元素引用

// 初始化计算器
function initCalculator() {
    displayElement = document.querySelector(".card");
    setupEventListeners();
    updateDisplay(); // 初始化显示
}

// 设置事件监听器
function setupEventListeners() {
    document.querySelectorAll('[data-input="num"]').forEach(button => {
        button.addEventListener("click", () => {
            appendNumber(button.value);
        });
    });
    document.querySelectorAll('[data-input="operator"]').forEach(button => {
        button.addEventListener("click", () => {
            handleOperatorInput(button.value);
        });
    });
}

// 追加数字
function appendNumber(number) {
    // 判断是否需要重置屏幕
    if (shouldResetScreen) {
        currentOperand = "0";
        shouldResetScreen = false;
    }
    
    // 判断是否有小数点
    if (number === "dot") {
        if (currentOperand.includes(".")) {
            return; // 已经有小数点，不再添加
        }
        // 如果当前是0，添加小数点前确保有数字
        if (currentOperand === "0") {
            currentOperand += ".";
        } else {
            currentOperand += ".";
        }
    } else {
        // 普通数字处理
        if (currentOperand === "0") {
            currentOperand = number; // 替换初始的0
        } else {
            currentOperand += number; // 追加数字
        }
    }
    
    updateDisplay();
}

// 处理操作符
function handleOperatorInput(operator) {
    // 特殊功能键处理
    if (operator === 'delete') {
        if (currentOperand.length === 1) {
            currentOperand = "0";
        } else {
            currentOperand = currentOperand.slice(0, -1);
        }
        updateDisplay();
        return;
    }
    
    if (operator === 'all-clear') {
        currentOperand = "0";
        previousOperand = "";
        operation = undefined;
        updateDisplay();
        return;
    }
    
    if (operator === 'percent') {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
        return;
    }
    
    if (operator === 'plus-minus') {
        currentOperand = (parseFloat(currentOperand) * -1).toString();
        updateDisplay();
        return;
    }
    
    // 四则运算符和等号处理
    if (operator === 'equal') {
        console.log("等于符号当前数字 " + currentOperand);
        console.log("等于符号前数字 : " + previousOperand);
        console.log("等于符号操作符 : " + operation);
        // 执行计算
        if (previousOperand !== "" && operation !== undefined) {
            calculate();
            previousOperand = "";
            operation = undefined;
            shouldResetScreen = true;
        }
        console.log("等于符号当前数字 " + currentOperand);
        console.log("等于符号前数字 : " + previousOperand);
        console.log("等于符号操作符 : " + operation);
        updateDisplay();
        return;
    }
    
    // 四则运算符处理
    // 如果已有上一个操作数和操作符，先执行计算
    if (operator === "add" || operator === "subtract" || operator === "multiply" || operator === "divide") {
        if (previousOperand !== "" && operation !== undefined) {
            console.log("previousOperand: " + previousOperand);
            console.log("currentOperand: " + currentOperand);
            console.log("operation: " + operation);
            calculate();  
        }
        console.log("currentOperand: " + currentOperand);
        console.log("previousOperand: " + previousOperand);
        console.log("operation: " + operation);
        previousOperand = currentOperand;
        // currentOperand = "";
        shouldResetScreen = true;
        operation = operator;
        console.log("currentOperand: " + currentOperand);
        console.log("previousOperand: " + previousOperand);
        console.log("operation: " + operation);
    }
    // 保存当前操作数和操作符 
    updateDisplay();
}

// 计算结果
function calculate() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    
    // 检查是否有有效数字
    if (isNaN(prev) || isNaN(current)) return;
    
    // 根据操作符执行计算
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
            if (current === 0) {
                alert("不能除以零");
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    
    // 更新当前操作数为计算结果
    currentOperand = computation.toString();
    console.log("calculation result: " + currentOperand);
}

// 格式化显示数字
function formatDigitalDisplay(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    if (isNaN(integerDigits)) {
        integerDisplay = "0";
    } else {
        integerDisplay = integerDigits.toLocaleString("zh-CN");
    }
    
    if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits.slice(0, 10)}`;
    } else {
        return integerDisplay;
    }
}

// 更新计算器显示
function updateDisplay() {
    const formattedValue = formatDigitalDisplay(currentOperand);
    displayElement.textContent = formattedValue;
}

// 页面加载完成后初始化计算器
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
});