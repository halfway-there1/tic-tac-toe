// const gameBoard = document.getElementById('board');

function GameBoard() {
  const board = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const getBoard = () => board;
  let roundsLeft = 9;

  function printBoard() {
    for (let i = 0; i < 3; i++) {
      let str = '';
      for (let j = 0; j < 3; j++) {
        str += board[i][j] + ' ';
      }
      console.log(str);
    }
  }

  function mark(row, column, player) {
    board[row][column] = player.token;
    roundsLeft--;
  }

  function won(player) {
    const token = player.token;
    let ans = false;

    // check for rows and columns
    for (let i = 0; i < 3; i++) {
      let tokentCntRow = 0;
      let tokentCntCol = 0;
      for (let j = 0; j < 3; j++) {
        tokentCntRow += board[i][j] === token;
        tokentCntCol += board[j][i] === token;
      }
      if (tokentCntRow === 3 || tokentCntCol === 3) {
        ans = true;
        break;
      }
    }

    // check for the right diagonal
    ans =
      ans ||
      (board[0][0] === token && board[1][1] === token && board[2][2] === token);

    // check for the left diagonal
    ans =
      ans ||
      (board[0][2] === token && board[1][1] === token && board[2][0] === token);

    return ans;
  }

  const tie = () => {
    return roundsLeft === 0;
  };

  return { getBoard, printBoard, mark, won, tie };
}

let game;

function GameController(playerOneName = 'Anurag', playerTwoName = 'Purnima') {
  const board = GameBoard();

  const players = [
    {
      name: playerOneName,
      token: 1,
    },
    {
      name: playerTwoName,
      token: 2,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${activePlayer.name}'s turn.`);
  };

  const gameReset = () => {
    board.printBoard();
    const choice = prompt('Play Again ? (Y/N)');
    if (choice === 'Y') {
      console.clear();
      starNewGame();
    } else {
      game = null;
    }
  };

  const playRound = (row, column) => {
    // player cannot mark an already marked cell
    if (board.getBoard()[row][column] !== 0) {
      console.log('Invalid Move ❌❌❌');
      return;
    }

    console.clear();
    console.log(
      `Dropping ${activePlayer.name}'s mark into row = ${row} column = ${column} ...`
    );
    board.mark(row, column, activePlayer);

    // Winning Logic
    if (board.won(activePlayer)) {
      console.log(`${activePlayer.name} has Won the Game 🎉🎉🎉`);
      gameReset();
    } else if (board.tie()) {
      // check if tie
      console.log(`Game Draw !!`);
      gameReset();
    } else {
      // continue to the next round
      switchPlayerTurn();
      printNewRound();
    }
  };

  printNewRound();

  return {
    playRound,
    // getActivePlayer,
    // getBoard: board.getBoard,
  };
}

function starNewGame() {
  console.clear();
  game = GameController();
}

starNewGame();
