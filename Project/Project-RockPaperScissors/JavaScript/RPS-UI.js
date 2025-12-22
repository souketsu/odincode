/* 
剪刀石头布用户界面 
    进入到页面有三个按钮分别是剪刀、石头、布
    点击按钮后，调用RPS-UI.js中的函数，并显示结果
    一共进行五轮游戏，每轮游戏结束后显示结果，并显示当前得分
    最后显示最终结果，并显示最终得分
伪代码
    1. 定义变量 playerName, playerChoice, serverChoice, playerScore, serverScore, gameRound
    2. 程序入口 main()
    3. 函数：获取玩家姓名 getPlayerName()
    4. 函数：获取玩家选择 getPlayerChoice()
    5. 函数：判断玩家选择是否有效 isValidChoice(playerChoice)
    6. 函数：检查玩家输入是否有效 checkPlayerChoice(playerChoice)
    7. 函数：服务器随机选择 getServerChoice()
    8. 函数：判断游戏结果 judgeGameResult(playerChoice, serverChoice)
    9. 函数：更新得分 updateScore(playerScore, serverScore)
    10. 函数：显示结果 displayResult(playerChoice, serverChoice, gameResult, playerScore, serverScore)
    11. 调用程序入口 main()

伪代码

*/

// 定义变量
let playerName = "";
let playerChoiceTemp = "";
let playerChoice = 0;
let serverChoice = "";
let playerScore = 0;
let judgeNumber = 0; // 0: 平局 1: 玩家赢 2: 电脑赢
let serverScore = 0;
let gameRound = 1;
let gameRoundStatus = [];
let gameStarted = false;

// 程序入口
function main() {
    // 获取玩家选择
    alert("游戏已准备就绪，请输入玩家姓名并点击'开始游戏'按钮");

}


// 函数定义

// 开始游戏
function startGame() {
  playerName = getPlayerName(); // 获取玩家姓名
  // 显示欢迎信息
  if (playerName === "") {
      return (gameStarted = false);
  } else {
      gameStarted = true; // 设置游戏开始标志
      alert(`游戏开始！玩家姓名：${playerName}`);
      gameStarted = true; // 设置游戏开始标志
      //重置游戏状态
      playerScore = 0;
      serverScore = 0;
      gameRound = 1;
      gameRoundStatus = []; // 清空游戏状态数组
      updateScoreDisplay(); // 更新得分显示
  }
}

// 获取玩家姓名
/* 函数 getPlayerName()
    功能：获取玩家姓名
    参数：无
    返回值：玩家姓名
   伪代码
    1. 从页面获取玩家姓名输入框
    2. 获取玩家输入的姓名
    3. 检查玩家姓名是否为空
    4. 如果为空，提示玩家输入姓名
    5. 如果不为空，返回玩家姓名
*/
function getPlayerName() {
    // 输入玩家名字
    const inputPlayerName = document.querySelector("#playerName");
    playerName = inputPlayerName.value;
    // 显示玩家名字
    // 检查玩家名字是否存在
    if (playerName === "") {
        alert("请输入您的姓名！");
        return "";
    }
    // 创建玩家名字元素,并添加到页面
    const playerNameLabel = document.querySelector("#playerNameLabel");
    const playerNameSpan = document.createElement("span");
    playerNameSpan.textContent = playerName;
    playerNameLabel.appendChild(playerNameSpan);
    console.log(playerName);
    return playerName;
}
// 获取玩家选择
/* 函数 getPlayerChoice()
    功能：获取玩家选择
    参数：无
    返回值：玩家选择
   伪代码
    1. 从页面获取玩家选择按钮
    2. 为每个按钮添加点击事件监听器
    3. 检查点击的是否是按钮
    4. 如果是按钮，获取按钮的文本内容作为玩家选择
    5. 返回玩家选择
*/

function handlePlayerChoice() {
    // 从页面获取玩家选择按钮
    const inputPlayerChoice = document.querySelector("#gameArea");
    // 为每个按钮添加点击事件监听器
    inputPlayerChoice.addEventListener("click", (event) => {
        // 检查点击的是否是按钮
        if (event.target.tagName === "BUTTON"){
            playerChoiceTemp = event.target.textContent;
            console.log(playerChoiceTemp);
            formatPlayerChoice(playerChoiceTemp);
            getServerChoice();
            judge(playerChoice, serverChoice);
            updateScoreAndRound(judgeNumber);
            updateScoreDisplay();

        }
    } );       
}

// 将玩家选择格式化为数字
/* 函数 formatPlayerChoice(playerChoice)
    功能：将玩家选择格式化为数字
    参数：玩家选择
    返回值：格式化后的玩家选择
   伪代码
    1. 将玩家选择转换为数字
    2. 返回格式化后的玩家选择
*/
function formatPlayerChoice(playerChoiceTemp) {
    if (playerChoiceTemp === "石头") {
        return  playerChoice = 1;
    } else if (playerChoiceTemp === "剪刀") {
        return  playerChoice = 2;
    } else if (playerChoiceTemp === "布") {
        return  playerChoice = 3;
    }
}
    
// 获取服务器端返回的电脑选择
/* 函数 getServerChoice()
    功能：获取服务器端返回的电脑选择
    参数：无
    返回值：服务器端返回的电脑选择
   伪代码
    1. 从服务器端获取电脑选择
    2. 返回服务器端返回的电脑选择
*/
function getServerChoice() {
    // 从服务器端获取电脑选择
    serverChoice = Math.floor(Math.random() * 3 + 1);
    console.log(`serverChoice: ${serverChoice}`);
    return serverChoice;
}

// 判断游戏结果
/* 函数 judge(playerChoice, serverChoice)
    功能：判断游戏结果
    参数：玩家选择，服务器端返回的电脑选择
    返回值：游戏结果
   伪代码
    1. 比较玩家选择和服务器端返回的电脑选择
    2. 根据比较结果判断游戏结果
    3. 返回游戏结果
*/
function judge(playerChoice, serverChoice) {
    if (playerChoice === serverChoice) {
      return;
    } else if (
      (playerChoice === 1 && serverChoice === 2) ||
      (playerChoice === 2 && serverChoice === 3) ||
      (playerChoice === 3 && serverChoice === 1)
    ) {
      return judgeNumber = 1;
    } else {
      return judgeNumber = 2;
    }
}

// 计算得分与轮数
/* 函数 calculateScoreAndRound(judgeNumber)
    功能：计算得分与轮数
    参数：游戏结果
    返回值：无
   伪代码
    1. 根据游戏结果判断得分与轮数
    2. 更新玩家得分与轮数
*/
function updateScoreAndRound(judgeNumber) {
   switch (judgeNumber) {
      case 1:
        playerScore++;
       break;
      case 2:
        serverScore++;
        break;
      default:
        break;   
}  
 gameRound++;
 if (gameRound > 5) {
    endGame();
    playerScore = 0;
    serverScore = 0;
    gameRound = 1;
    gameRoundStatus = []; // 清空游戏状态数组
    updateScoreDisplay();
 }
}

// 显示得分与轮数
/* 函数 displayScoreAndRound()
    功能：显示得分与轮数
    参数：无
    返回值：无
   伪代码
    1. 从页面获取得分与轮数元素
    2. 更新得分与轮数元素的文本内容
*/
function updateScoreDisplay() {
    const playerScoreElement = document.querySelector("#playerScoreLabel");
    playerScoreElement.textContent = `玩家分数：${playerScore}`;

    const serverScoreElement = document.querySelector("#serverScoreLabel");
    serverScoreElement.textContent = `电脑分数：${serverScore}`;

    const roundElement = document.querySelector("#roundLabel");
    roundElement.textContent = `当前轮数：${gameRound > 5 ? 5 : gameRound}/5`;
}

function displayRoundResult() {
  const choiceMap = {
    1: "石头",
    2: "剪刀",
    3: "布",
  };

  const resultMap = {
    0: "平局",
    1: "玩家赢",
    2: "电脑赢",
  };

  const resultText = `本轮结果：${choiceMap[playerChoice]} vs ${choiceMap[serverChoice]} - ${resultMap[judgeNumber]}`;

  // 创建或更新结果显示区域
  let resultDiv = document.getElementById("roundResult");
  if (!resultDiv) {
    resultDiv = document.createElement("div");
    resultDiv.id = "roundResult";
    document.getElementById("roundArea").appendChild(resultDiv);
  }

  resultDiv.textContent = resultText;
}

// 游戏结束
function endGame() {
  let finalResult;
  if (playerScore > serverScore) {
    finalResult = "恭喜你赢了！";
  } else if (playerScore < serverScore) {
    finalResult = "很遗憾，你输了！";
  } else {
    finalResult = "平局！";
  }

  alert(
    `游戏结束！\n${finalResult}\n最终比分 - 玩家：${playerScore}，电脑：${serverScore}`
  );

  // 重置游戏状态
  gameStarted = false;
}


document.addEventListener("DOMContentLoaded", function() {
    const gameArea = document.querySelector("#gameArea");
    gameArea.addEventListener("click",handlePlayerChoice);
    main();
    updateScoreDisplay();
});