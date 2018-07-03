console.log('app.js loaded');

// var playerTurn = 'naught';
// var opponentTurn = 'cross';
var players = {
  active: 'naught',
  inactive: 'cross'
}

var board = document.querySelector('.board');
var cells = document.querySelector('.cell');

board.addEventListener('click', function(event) {
  if (!event.target.classList.contains('cell')) { return; }
  if (event.target.classList.contains('naught') ||
      event.target.classList.contains('cross')) { return; }
  event.target.classList.add(players.active);
  togglePlayerTurn();
})

function togglePlayerTurn() {
  var tempActive = players.active;
  var tempInactive = players.inactive;

  players = {
    active: tempInactive,
    inactive: tempActive
  };
}
