// 调用函数
let result = add7(10);
console.log(result);
alert(result);

let result2 = multiply(2, 3);
console.log(result2);
alert(result2);

let result3 = capitalize("hEllo");
console.log(result3);
alert(result3);


// 函数

function add7(num) {
    return num + 7;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function capitalize(params) {
    return params[0].toUpperCase() + params.slice(1).toLowerCase();
}
