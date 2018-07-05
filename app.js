console.log('app.js loaded');

var gameState = {};
var defaultGameState = {
  version: '2018-07-05_1300',
  rounds: 0,
  players: {
    active: 'naught',
    inactive: 'cross'
  },

  pieces: {
    cross: 'assets/svg/cross.svg',
    naught: 'assets/svg/naught.svg'
  },

  wins: {
    naught: 0,
    cross: 0,
    tie: 0
  },

  board: [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ],

  running: true
};

function clearGameState() {
  storeGameState(defaultGameState);
}

function initializeGameState() {
  if (localStorage.getItem('gameState-version') !== defaultGameState.version) {
    clearGameState();
  }
}

function restoreGameState() {
  gameState = {
    version: localStorage.getItem('gameState-version'),
    rounds: localStorage.getItem('gameState-rounds'),
    players: {
      active: localStorage.getItem('gameState-players-active'),
      inactive: localStorage.getItem('gameState-players-inactive')
    },

    pieces: {
      cross: localStorage.getItem('gameState-pieces-cross'),
      naught: localStorage.getItem('gameState-pieces-naught')
    },

    wins: {
      naught: localStorage.getItem('gameState-wins-naught'),
      cross: localStorage.getItem('gameState-wins-cross'),
      tie: localStorage.getItem('gameState-wins-tie')
    },

    board: JSON.parse(localStorage.getItem('gameState-board')),

    running: localStorage.getItem('gameState-running')
  };
};

function storeGameState(currentState) {
  localStorage.setItem('gameState-version', currentState.version);
  localStorage.setItem('gameState-rounds', currentState.rounds);
  localStorage.setItem('gameState-players-active', currentState.players.active);
  localStorage.setItem('gameState-players-inactive', currentState.players.inactive);
  localStorage.setItem('gameState-pieces-cross', currentState.pieces.cross);
  localStorage.setItem('gameState-pieces-naught', currentState.pieces.naught);
  localStorage.setItem('gameState-wins-naught', currentState.wins.naught);
  localStorage.setItem('gameState-wins-cross', currentState.wins.cross);
  localStorage.setItem('gameState-wins-tie', currentState.wins.tie);
  localStorage.setItem('gameState-board', JSON.stringify(currentState.board));
  localStorage.setItem('gameState-running', currentState.running);
};

var board = document.querySelector('.board');
var cells = document.querySelectorAll('.cell');
var rows = document.querySelectorAll('.row');

var roundsEl = document.querySelector('.rounds');
var detailsEl = document.querySelector('.details');
var winnerEl = document.querySelector('.winner');

var controls = document.querySelector('.controls');
var resetBoardBtn = controls.querySelector('.reset-board');
var resetScoresBtn = controls.querySelector('.reset-scores');
var resetAllBtn = controls.querySelector('.reset-all');

var winsEl = document.querySelector('.wins');
var naughtWinsEl = winsEl.querySelector('.naught');
var crossWinsEl = winsEl.querySelector('.cross');
var tieWinsEl = winsEl.querySelector('.tie');

var possibleWinStates = {
  majorDiagonal: { draw: false, cells: [rows[0].children[0], rows[2].children[2]] },
  minorDiagonal: { draw: false, cells: [rows[0].children[2], rows[2].children[0]] },

  topRow: { draw: false, cells: [rows[0].children[0], rows[0].children[2]] },
  middleRow: { draw: false, cells: [rows[1].children[0], rows[1].children[2]] },
  bottomRow: { draw: false, cells: [rows[2].children[0], rows[2].children[2]] },

  leftColumn: { draw: false, cells: [rows[0].children[0], rows[2].children[0]] },
  middleColumn: { draw: false, cells: [rows[0].children[1], rows[2].children[1]] },
  rightColumn: { draw: false, cells: [rows[0].children[2], rows[2].children[2]] }
};

var chalkSfx = {
  erase: new Audio("assets/sfx/chalk-erase.mp3"),
  cross: new Audio("assets/sfx/chalk-cross.mp3"),
  line: new Audio("assets/sfx/chalk-line.mp3"),
  naught: new Audio("assets/sfx/chalk-naught.mp3"),
  tie: new Audio("assets/sfx/chalk-tie.mp3")
};

function placePiece(cell, player) {
  if (!player) { return; }
  var pieceEl = document.createElement('iframe');
  pieceEl.classList.add('chalk');
  pieceEl.classList.add(player);
  pieceEl.src = gameState.pieces[player];
  cell.appendChild(pieceEl);

  cell.classList.add(player);
  gameState.board[cell.dataset.row][cell.dataset.column] = player;
}

function playerTurn(event) {
  if (!gameState.running) { return; }
  if (!event.target.classList.contains('cell')) { return; }
  if (event.target.classList.contains('naught') ||
      event.target.classList.contains('cross')) { return; }

  placePiece(event.target, gameState.players.active);

  chalkSfx[gameState.players.active].play();
  checkForWinner(gameState.players.active);
  togglePlayerTurn();
  storeGameState(gameState);
}

function togglePlayerTurn() {
  if (!gameState.running) { return; }
  var tempActive = gameState.players.active;
  var tempInactive = gameState.players.inactive;

  gameState.players = {
    active: tempInactive,
    inactive: tempActive
  };
}

function initializeBoard() {
  gameState.board.forEach(function(rows, rowsIndex) {
    rows.forEach(function(player, columnIndex, row) {
      placePiece(cells[(rowsIndex * row.length) + columnIndex], player);
    })
  });
  checkForWinner(gameState.players.active);
}

function checkCols(player) {
  possibleWinStates.leftColumn.draw = gameState.board[0][0] === player && gameState.board[1][0] === player && gameState.board[2][0] === player;
  possibleWinStates.middleColumn.draw = gameState.board[0][1] === player && gameState.board[1][1] === player && gameState.board[2][1] === player;
  possibleWinStates.rightColumn.draw = gameState.board[0][2] === player && gameState.board[1][2] === player && gameState.board[2][2] === player;
  return (
    possibleWinStates.leftColumn.draw ||
    possibleWinStates.middleColumn.draw ||
    possibleWinStates.rightColumn.draw
  );
}

function checkRows(player) {
  possibleWinStates.topRow.draw = gameState.board[0][0] === player && gameState.board[0][1] === player && gameState.board[0][2] === player;
  possibleWinStates.middleRow.draw = gameState.board[1][0] === player && gameState.board[1][1] === player && gameState.board[1][2] === player;
  possibleWinStates.bottomRow.draw = gameState.board[2][0] === player && gameState.board[2][1] === player && gameState.board[2][2] === player;
  return (
    possibleWinStates.topRow.draw ||
    possibleWinStates.middleRow.draw ||
    possibleWinStates.bottomRow.draw
  );
}

function checkDiagonals(player) {
  possibleWinStates.majorDiagonal.draw = gameState.board[0][0] === player && gameState.board[1][1] === player && gameState.board[2][2] === player;
  possibleWinStates.minorDiagonal.draw = gameState.board[2][0] === player && gameState.board[1][1] === player && gameState.board[0][2] === player;
  return (
    possibleWinStates.majorDiagonal.draw ||
    possibleWinStates.minorDiagonal.draw
  );
}

function allCellsFull() {
  return [].every.call(cells, function(cell) {
    return cell.classList.contains('naught') || cell.classList.contains('cross');
  });
}

function updateScoreboard(winner) {
  if (winner === 'tie') {
    winnerEl.textContent = 'Draw!';
  } else {
    winnerEl.textContent = winner + ' Wins!';
  }

  roundsEl.textContent = gameState.rounds;
  naughtWinsEl.textContent = gameState.wins.naught;
  crossWinsEl.textContent = gameState.wins.cross;
  tieWinsEl.textContent = gameState.wins.tie;
}

function updateWins(winner) {
  gameState.wins[winner]++;
  updateScoreboard(winner);
  gameState.running = false;
  storeGameState(gameState);
  detailsEl.classList.remove('hidden');
}

function onWin() {
  updateWins(player);
  drawWinningLine();
}

function onTie() {
  updateWins('tie');
  chalkSfx.tie.play();
}

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    onWin();
  } else if (allCellsFull()) {
    onTie();
  }
}

function cleanBoard() {
  gameState.board = defaultGameState.board.map((x) => x.slice());
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
    cell.innerHTML = ''; // Delete Children `img` elements
  });
}

function clearBoard() {
  disableBoard();
  clearBoardAnimation();
  setTimeout(enableBoard, 1000);
}

function clearBoardAnimation() {
  chalkSfx.erase.play();
  cells.forEach(function(cell) {
    var piece = cell.children[0];
    if (piece) { piece.classList.add('fade-out'); }
  });
  detailsEl.classList.add('hidden');
  gameState.board = defaultGameState.board.map((x) => x.slice());
  removeWinningLine();
}

function disableBoard() {
  board.removeEventListener('click', playerTurn);
  gameState.running = false;
}

function enableBoard() {
  cleanBoard();
  gameState.running = true;
  board.addEventListener('click', playerTurn);
}

function resetBoard() {
  clearBoard();
  updateRound();
  gameState.running = true;
  storeGameState(gameState);
}

function resetScores() {
  gameState.rounds = defaultGameState.rounds;
  gameState.wins = defaultGameState.wins;
  storeGameState(gameState);
  updateScoreboard();
}

function resetAll() {
  clearBoard();
  storeGameState(defaultGameState);
  restoreGameState();
  updateScoreboard();
}

function updateRound() {
  gameState.rounds++;
  updateScoreboard();
}

function getOffset( el ) {
  var rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight
  };
}

// == Sourced:
// - [javascript - How to draw a line between two divs? - Stack Overflow]
//   (https://stackoverflow.com/questions/8672369/how-to-draw-a-line-between-two-divs)
function connect(div1, div2, color, thickness, hasStyle) { // draw a line connecting elements
  var off1 = getOffset(div1);
  var off2 = getOffset(div2);
  // find center of div1 (was bottom right)
  var x1 = off1.left + off1.width/2;
  var y1 = off1.top + off1.height/2;
  // find center of div1 (was top right)
  var x2 = off2.left + off2.width/2;
  var y2 = off2.top + off2.height/2;

  return buildWinningLine(thickness, color, x1, x2, y1, y2, hasStyle);
}

function buildWinningLine(thickness, color, x1, x2, y1, y2, hasStyle) {
  var boardDimensions = board.getBoundingClientRect();
  var style = '';

  if (hasStyle) {
    style = '<style>' +
      '.path {' +
      '  stroke-dasharray: 1000;' +
      '  stroke-dashoffset: 1000;' +
      '  animation: dash 5s linear forwards;' +
      '}' +

      '@keyframes dash {' +
      '  to {' +
      '    stroke-dashoffset: 0;' +
      '  }' +
      '}' +
    '</style>';
  }

  var htmlLineEl = document.createElement('div');
  htmlLineEl.innerHTML =
  '<svg class="winning-move"' +
        ' width="' + boardDimensions.width + '"' +
        ' height="' + boardDimensions.height + '"' +
        ' xmlns="http://www.w3.org/2000/svg" version="1.1"' +
        ' style="' +
          'position: absolute;' +
          'top: 0;' +
          'left: 0;' +
        '">' +
    style +
    '<line class="path" ' +
      'x1="' + x1 + '"' +
      'x2="' + x2 + '"' +
      'y1="' + y1 + '"' +
      'y2="' + y2 + '"' +
      'stroke="' + color + '"' +
      'stroke-width="' + thickness + '" ' +
      'stroke-linecap="round"' +
    ' />' +
  '</svg>';
  return htmlLineEl.firstChild;
}

function drawWinningLine() {
  Object.keys(possibleWinStates).forEach(function (key) {
    if (possibleWinStates[key].draw) {
      board.appendChild(
        connect(possibleWinStates[key].cells[0], possibleWinStates[key].cells[1], 'mediumspringgreen', 5, true)
      );
    }
  });
  chalkSfx.line.play();
}

function removeWinningLine() {
  var lineEl = document.querySelector('.winning-move');
  if (lineEl) { board.removeChild(lineEl); }
}

function resizeWinningLine(event) {
  var lineEl = document.querySelector('.winning-move');
  if (lineEl) {
    Object.keys(possibleWinStates).forEach(function (key) {
      if (possibleWinStates[key].draw) {
        lineEl.parentNode.replaceChild(
          connect(possibleWinStates[key].cells[0], possibleWinStates[key].cells[1], 'mediumspringgreen', 5, false),
          lineEl
        );
      }
    });
  }
}

// document ready
(function() {
  window.addEventListener('resize', resizeWinningLine);
  board.addEventListener('click', playerTurn);

  resetBoardBtn.addEventListener('click', resetBoard);
  resetScoresBtn.addEventListener('click', resetScores);
  resetAllBtn.addEventListener('click', resetAll);

  initializeGameState();
  restoreGameState();
  initializeBoard();
  updateScoreboard();
})();
