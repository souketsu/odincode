/**
 * Player 工厂函数
 * 用于创建玩家对象，每个玩家有自己的名字和棋子标记（X 或 O）
 */
const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {
    getName,
    getMarker,
  };
};

/**
 * gameBoard 模块 (IIFE)
 * 职责：负责管理棋盘的数据状态（底层的 9 格数组）
 */
const gameBoard = (function () {
  const board = []; // 私有数组，存储棋盘状态

  // 清空棋盘数组
  const resetBoard = () => {
    board.length = 0;
  };

  // 初始化棋盘，填充 9 个空格
  const initGameBoard = () => {
    board.length = 0;
    for (let i = 0; i < 9; i++) {
      board.push(" ");
    }
  };

  // 在指定索引位置落子
  const putMarker = (index, marker) => {
    board[index] = marker;
  };

  // 获取当前的棋盘状态
  const getBoard = () => {
    return board;
  };

  return {
    initGameBoard,
    resetBoard,
    getBoard,
    putMarker,
  };
})();

/**
 * gameController 模块 (IIFE)
 * 职责：游戏的核心导演。控制流程、判断胜负、切换玩家。
 */
const gameController = (function () {
  // 1. 初始化两名玩家
  let player1 = player("Player 1", "X");
  let player2 = player("Player 2", "O");

  // 2. 定义所有获胜组合的索引
  const winPattern = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // 横向
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // 纵向
    [0, 4, 8],
    [2, 4, 6], // 对角线
  ];

  // 3. 追踪当前活跃玩家
  let activePlayer = player1;

  //设置玩家的方法
  const setPlayer = (name1, name2) => {
    player1 = player(name1 || "Player 1", "X");
    player2 = player(name2 || "Player 2", "O");
    activePlayer = player1;
  };

  // 初始化棋盘数据记录
  const initBoard = () => {
    gameBoard.initGameBoard();
  };

  /**
   * 核心方法：检查是否有赢家
   * 逻辑：遍历 winPattern，检查对应索引的值是否相同且不为空格
   */
  const checkWinner = () => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < winPattern.length; i++) {
      const [a, b, c] = winPattern[i];
      if (board[a] === board[b] && board[b] === board[c] && board[a] !== " ") {
        return { marker: board[a], indices: [a, b, c] }; // 返回获胜者的标记 (X 或 O)
      }
    }
    return null;
  };

  /**
   * 进行一轮下棋动作
   * @param {number} index - 玩家点击的方格索引 (0-8)
   */
  const playRound = (index) => {
    const board = gameBoard.getBoard();

    // 检查落子合法性（格子必须为空，且还没人赢）
    if (board[index] !== " " || checkWinner()) {
      return { status: "invalid", board };
    }

    // 落子
    gameBoard.putMarker(index, activePlayer.getMarker());

    // 检查结果
    const winInfo = checkWinner();
    const currentBoard = gameBoard.getBoard();

    if (winInfo) {
      return {
        status: "win",
        winner: activePlayer.getName(),
        winIndices: winInfo.indices,
      };
    }

    if (!currentBoard.includes(" ")) {
      return { status: "tie", board: currentBoard };
    }

    // 正常继续，切换玩家
    switchPlayerRound();
    return { status: "ongoing", board: currentBoard };
  };

  // 切换活跃玩家
  const switchPlayerRound = () => {
    activePlayer = activePlayer === player1 ? player2 : player1;
  };

  // 重置游戏状态
  const resetBoard = () => {
    activePlayer = player1;
    initBoard();
  };

  // 获取当前轮到谁了
  const getActivePlayer = () => activePlayer;

  return {
    setPlayer,
    initBoard,
    resetBoard,
    get player1() {
      return player1;
    },
    get player2() {
      return player2;
    },
    playRound,
    switchPlayerRound,
    getActivePlayer,
  };
})();

/**
 * displayController 模块 (IIFE)
 * 职责：处理显示/DOM 逻辑。比如更新页面上的文字、给方格绑定点击事件。
 */
const displayController = (function () {
  const player1Name = document.getElementById("player1Name");
  const player2Name = document.getElementById("player2Name");
  const savePlayerNameBtn = document.getElementById("savePlayerNameBtn");
  const gameBoardContainer = document.getElementById("gameBoard");
  const restartBtn = document.getElementById("restartBtn");
  const playerTurn = document.getElementById("playerTurn");
  const gameResult = document.getElementById("gameResult");
  //保存玩家名称
  const savePlayerName = () => {
    gameController.setPlayer(player1Name.value, player2Name.value);
    updatePlayerTurn();
  };

  //初始化显示棋盘
  const initDisplayBoard = () => {
    gameBoard.initGameBoard();
    renderBoard();
    updatePlayerTurn();
  };

  //渲染棋盘
  const renderBoard = (winIndices = []) => {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      const cell = document.getElementById(`cell${i}`);
      cell.textContent = board[i];

      // 清除旧类名并根据内容添加 X/O 的颜色类
      cell.classList.remove("x-marker", "o-marker", "winning-cell");
      if (board[i] === "X") cell.classList.add("x-marker");
      if (board[i] === "O") cell.classList.add("o-marker");

      // 如果是获胜的三个格子，加上高亮类
      if (winIndices.includes(i)) cell.classList.add("winning-cell");
    }
  };

  //更新玩家轮次
  const updatePlayerTurn = () => {
    playerTurn.textContent = `轮到 ${gameController
      .getActivePlayer()
      .getName()} 下棋`;
  };

  //更新游戏结果
  const updateGameResult = (result) => {
    gameResult.textContent = result;
  };

  //重新开始
  const restartGame = () => {
    gameController.resetBoard();
    updateGameResult("");
    renderBoard();
    updatePlayerTurn();
  };

  //绑定事件
  const bindEvents = () => {
    savePlayerNameBtn.addEventListener("click", savePlayerName);
    restartBtn.addEventListener("click", restartGame);
    gameBoardContainer.addEventListener("click", (e) => {
      const getCell = e.target;
      if (!getCell.classList.contains("cell")) return;

      const index = parseInt(getCell.id.replace("cell", ""));
      const result = gameController.playRound(index);

      // 更新视觉显示
      renderBoard();

      // 根据结果处理 UI
      if (result.status === "win") {
        updateGameResult(`${result.winner} 获胜了！`);
        renderBoard(result.winIndices);
      } else if (result.status === "tie") {
        updateGameResult("平局！游戏结束。");
      } else if (result.status === "ongoing") {
        updatePlayerTurn();
      }
    });
  };

  //初始化
  const init = () => {
    bindEvents();
    initDisplayBoard();
  };

  return {
    init,
    savePlayerName,
    updatePlayerTurn,
    updateGameResult,
  };
})();
displayController.init();
