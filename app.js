console.log('app.js loaded');

// var playerTurn = 'naught';
// var opponentTurn = 'cross';
var players = {
  active: 'naught',
  inactive: 'cross'
}

var running = true;
var winner = '';

var board = document.querySelector('.board');
var cells = document.querySelectorAll('.cell');
var rows = document.querySelectorAll('.row');

var winnerEl = document.querySelector('.winner');

board.addEventListener('click', function(event) {
  if (!running) { return; }
  if (!event.target.classList.contains('cell')) { return; }
  if (event.target.classList.contains('naught') ||
      event.target.classList.contains('cross')) { return; }
  event.target.classList.add(players.active);
  checkForWinner(players.active);
  togglePlayerTurn();
})

function togglePlayerTurn() {
  if (!running) { return; }
  var tempActive = players.active;
  var tempInactive = players.inactive;

  players = {
    active: tempInactive,
    inactive: tempActive
  };
}

function checkCols(player) {
  return (
    rows[0].children[0].classList.contains(player) && rows[1].children[0].classList.contains(player) && rows[2].children[0].classList.contains(player) ||
    rows[0].children[1].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[2].children[1].classList.contains(player) ||
    rows[0].children[2].classList.contains(player) && rows[1].children[2].classList.contains(player) && rows[2].children[2].classList.contains(player)
  );
}

function checkRows(player) {
  return (
    rows[0].children[0].classList.contains(player) && rows[0].children[1].classList.contains(player) && rows[0].children[2].classList.contains(player) ||
    rows[1].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[1].children[2].classList.contains(player) ||
    rows[2].children[0].classList.contains(player) && rows[2].children[1].classList.contains(player) && rows[2].children[2].classList.contains(player)
  );
}

function checkDiagonals(player) {
  return (
    rows[0].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[2].children[2].classList.contains(player) ||
    rows[2].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[2].children[0].classList.contains(player)
  );
}

function allCellsFull() {
  return [].every.call(cells, function(cell) {
    return cell.classList.contains('naught') || cell.classList.contains('cross');
  });
}

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    winner = player;
    winnerEl.textContent = winner + ' Wins!';
    running = false;
  } else if (allCellsFull()) {
    winnerEl.textContent = 'Draw!';
    running = false;
  }
}
