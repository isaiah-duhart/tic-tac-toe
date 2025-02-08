const Gameboard = (function () {
  const gameState = Array(9).fill(null);

  const winningCombinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  const placeMarker = (player, index) => {
    if (gameState[index] !== null) {
      alert("Not a valid square");
      return false;
    }
    gameState[index] = player;
    console.log(gameState);
    return true;
  };

  const getGameState = () => gameState;
  const gameOver = () => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        gameState[a] !== null &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }

    if (gameState.every((cell) => cell !== null)) {
      return "draw";
    }

    return null;
  };

  const resetBoard = () => {
    gameState.fill(null);
  };

  return { placeMarker, getGameState, gameOver, resetBoard };
})();

const GameController = (function () {
  // X for player 1, O for player 2
  let player = "X";

  const placeMarker = (index) => {
    if (!Gameboard.placeMarker(player, index)) {
      // TODO : Provide visual feedback that this move is not legal
      alert("Can't move there");
      return;
    }
    // Updating player for next move
    player = player === "X" ? "O" : "X";
    const result = Gameboard.gameOver();
    DisplayController.updateDisplay();

    if (result) {
      setTimeout(() => DisplayController.displayWinner(result), 300);
      resetGame();
    }
  };

  const resetGame = () => {
    Gameboard.resetBoard();
    DisplayController.updateDisplay();
  };

  return { placeMarker, resetGame };
})();

const DisplayController = (function () {
  const updateDisplay = () => {
    const squares = document.querySelectorAll(".board .square");
    const gameState = Gameboard.getGameState();

    squares.forEach((square, index) => {
      square.textContent = gameState[index] !== null ? gameState[index] : "";
    });
  };

  const displayWinner = (result) => {
    result === "draw" ? alert("It's a draw!") : alert(`Player ${result} wins!`);
  };

  return { updateDisplay, displayWinner };
})();

const board = document.querySelector(".board");
board.addEventListener("click", (event) =>
  GameController.placeMarker(event.target.dataset.index)
);

const resetButton = document.querySelector(".reset-board");
resetButton.addEventListener("click", () => GameController.resetGame());
