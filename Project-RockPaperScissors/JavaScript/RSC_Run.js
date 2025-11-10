// 测试
console.log("Hello World!");

// 参数定义
let playerName = "";
let playerChoice = "";
let serverChoice = "";
// 程序入口
function main() {
    console.log("RPS Game Start!");
}
// 函数：获取玩家姓名
function getPlayerName() {
    playerName = prompt("请输入您的姓名：");
    return playerName;
}
// 函数：获取玩家选择
function getPlayerChoice() {
    playerChoice = prompt("请输入您的选择1(石头)/2(剪刀)/3(布)：");
    return playerChoice;
}
// 函数：判断玩家选择是否有效
function isValidChoice(playerChoice) {
    playerChoice = Number(playerChoice);
    console.log(`playerChoice: ${playerChoice}`);
  return playerChoice === 1 || playerChoice === 2 || playerChoice === 3;
}
//检查玩家输入是否有效
function checkPlayerChoice(playerChoice) {
    if (!isValidChoice(playerChoice)) {
        alert("您的选择无效，请重新输入！");
        return false;
    }
    return true;
}
// 函数：服务器随机选择
function getServerChoice() {
    serverChoice = Math.floor(Math.random() * 3 + 1);
    console.log(`serverChoice: ${serverChoice}`);
    return serverChoice;
}
// 函数：判断游戏结果
function judgeGameResult(playerChoice, serverChoice) {
    playerChoice = Number(playerChoice);
    serverChoice = Number(serverChoice);
    if (playerChoice === serverChoice) {
        return alert("平局");
    } else if (
        (playerChoice === 1 && serverChoice === 2) ||
        (playerChoice === 2 && serverChoice === 3) ||
        (playerChoice === 3 && serverChoice === 1)
    ) {
        return alert(`${playerName}获胜`);
    } else {
        return alert(`${playerName}失败`);
    }
}
// 调用程序入口
main();
getPlayerName();
getPlayerChoice();
isValidChoice(playerChoice);
checkPlayerChoice(playerChoice);
getServerChoice();
judgeGameResult(playerChoice, serverChoice);
