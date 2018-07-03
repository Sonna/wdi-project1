console.log('app.js loaded');

var rounds = 0;
var players = {
  active: 'naught',
  inactive: 'cross'
}
var running = true;
var winner = '';

var board = document.querySelector('.board');
var cells = document.querySelectorAll('.cell');
var rows = document.querySelectorAll('.row');

var roundsEl = document.querySelector('.rounds');
var detailsEl = document.querySelector('.details');
var resetBtn = document.querySelector('button.reset');
var winnerEl = document.querySelector('.winner');

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
  possibleWinStates.leftColumn.draw = rows[0].children[0].classList.contains(player) && rows[1].children[0].classList.contains(player) && rows[2].children[0].classList.contains(player);
  possibleWinStates.middleColumn.draw = rows[0].children[1].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[2].children[1].classList.contains(player);
  possibleWinStates.rightColumn.draw = rows[0].children[2].classList.contains(player) && rows[1].children[2].classList.contains(player) && rows[2].children[2].classList.contains(player);
  return (
    possibleWinStates.leftColumn.draw ||
    possibleWinStates.middleColumn.draw ||
    possibleWinStates.rightColumn.draw
  );
}

function checkRows(player) {
  possibleWinStates.topRow.draw = rows[0].children[0].classList.contains(player) && rows[0].children[1].classList.contains(player) && rows[0].children[2].classList.contains(player);
  possibleWinStates.middleRow.draw = rows[1].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[1].children[2].classList.contains(player);
  possibleWinStates.bottomRow.draw = rows[2].children[0].classList.contains(player) && rows[2].children[1].classList.contains(player) && rows[2].children[2].classList.contains(player);
  return (
    possibleWinStates.topRow.draw ||
    possibleWinStates.middleRow.draw ||
    possibleWinStates.bottomRow.draw
  );
}

function checkDiagonals(player) {
  possibleWinStates.majorDiagonal.draw = rows[0].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[2].children[2].classList.contains(player);
  possibleWinStates.minorDiagonal.draw = rows[2].children[0].classList.contains(player) && rows[1].children[1].classList.contains(player) && rows[0].children[2].classList.contains(player);
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

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    winner = player;
    winnerEl.textContent = winner + ' Wins!';
    running = false;
    detailsEl.classList.remove('hidden');
    drawWinningLine();
  } else if (allCellsFull()) {
    winnerEl.textContent = 'Draw!';
    running = false;
    detailsEl.classList.remove('hidden');
  }
}

function resetBoard() {
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
  });
  detailsEl.classList.add('hidden');
  document.body.removeChild(document.querySelector('.winning-move'));
  updateRound();
  running = true;
}

resetBtn.addEventListener('click', resetBoard);

function updateRound() {
  rounds++;
  roundsEl.textContent = rounds;
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
function connect(div1, div2, color, thickness) { // draw a line connecting elements
  var off1 = getOffset(div1);
  var off2 = getOffset(div2);
  // find center of div1 (was bottom right)
  var x1 = off1.left + off1.width/2;
  var y1 = off1.top + off1.height/2;
  // find center of div1 (was top right)
  var x2 = off2.left + off2.width/2;
  var y2 = off2.top + off2.height/2;
  // distance
  var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
  // center
  var cx = ((x1 + x2) / 2) - (length / 2);
  var cy = ((y1 + y2) / 2) - (thickness / 2);
  // angle
  var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
  // make hr
  var htmlLineEl = document.createElement('div');
  htmlLineEl.classList.add('winning-move');
  htmlLineEl.setAttribute('style',
    "padding:0px; " +
    "margin:0px; " +
    "height:" + thickness + "px; " +
    "background-color:" + color + "; " +
    "line-height:1px; " +
    "position:absolute; " +
    "left:" + cx + "px; " +
    "top:" + cy + "px; " +
    "width:" + length + "px; " +
    "-moz-transform:rotate(" + angle + "deg); " +
    "-webkit-transform:rotate(" + angle + "deg); " +
    "-o-transform:rotate(" + angle + "deg); " +
    "-ms-transform:rotate(" + angle + "deg); " +
    "transform:rotate(" + angle + "deg);'"
  );
  document.body.appendChild(htmlLineEl);
}

function drawWinningLine() {
  Object.keys(possibleWinStates).forEach(function (key) {
    if (possibleWinStates[key].draw) {
      connect(possibleWinStates[key].cells[0], possibleWinStates[key].cells[1], 'green', 5);
    }
  });
}
