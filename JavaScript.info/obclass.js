"use strict";

let head = {
  glasses: 1,
};

let table = {
  pen: 3,
  __proto__: head,
};

let bed = {
  sheet: 1,
  pillow: 2,
  __proto__: table,
};

let pockets = {
  money: 2000,
  __proto__: bed,
};

console.log(pockets.pillow);
console.log(pockets.glasses);

//------------------------------------------------------//

let hamster = {
  stomach: [],

  eat(food) {
    this.stomach.push(food);
  },
};

let speedy = {
  __proto__: hamster,
  stomach: [],
};

let lazy = {
  __proto__: hamster,
  stomach: [],
};

// 这只仓鼠找到了食物
speedy.eat("apple");
lazy.eat("banana");
console.log(speedy.stomach); // apple

// 这只仓鼠也找到了食物，为什么？请修复它。
console.log(lazy.stomach); // apple
