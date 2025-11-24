/* 
 * 编写一个函数 camelize(str)，将一个字符串中的所有单词都变成骆驼拼写法。   
 * 例如：camelize("background-color") == 'backgroundColor';           
 * camelize("list-style-image") == 'listStyleImage';
 * camelize("-webkit-transition") == 'WebkitTransition';
 * 函数 camelize(str) 应该返回修改后的字符串。
 */

function camelize(str) {
  return str
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join("");
}

function filterRange(arr, a, b) {
  return arr.filter((item) => item >= a && item <= b);
}

function filterRangeInPlace(arr, a, b) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < a || arr[i] > b) {
      arr.splice(i, 1);
      i--;
    }
  }
}

function playSortArr() {
  let arr = [5, 2, 1, -10, 8];
  arr.sort((a, b) => b - a);
  alert(arr); // 8, 5, 2, 1, -10
}

function playCopySorted() {
  function copySorted(arr) {
    return arr.slice().sort();
  }
  let arr = ["HTML", "JavaScript", "CSS"];
  let sorted = copySorted(arr);
  alert(sorted); // CSS, HTML, JavaScript
  alert(arr); // HTML, JavaScript, CSS
}

function runshuffle() {
  let arr = [1, 2, 3];
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }
  for (let i = 0; i < 5; i++) {
    shuffle(arr);
    alert(arr);
  }
}

function unique(arr) {
  return Array.from(new Set(arr));
}

function runUnque() {
  let strings = [
    "Hare",
    "Krishna",
    "Hare",
    "Krishna",
    "Krishna",
    "Krishna",
    "Hare",
    "Hare",
    ":-O",
  ];

  alert(unique(strings)); // Hare, Krishna, :-O
  console.log(unique(strings));
}


