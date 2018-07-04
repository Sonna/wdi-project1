# WDI Project 1

To enjoy the game of Tic Tac Toe feature within this project repository, please
use the following link:

[https://alex.sonneveld.com.au/wdi-project1/](https://alex.sonneveld.com.au/wdi-project1/)

## Steps undertaken

 1. Setup a new project, using boilerplate code

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Project 1 - Tic Tac Toe</title>
  <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
  <script type="text/javascript" src="app.js"></script>
</body>
</html>
```

```css
/* style.css */
* { box-sizing: border-box; }
```

```javascript
// app.js
console.log('app.js loaded');
```

 2. Layout a basic structure of the board within the `<body>` of the page; 3
    rows, each with 3 columns to make a 3x3 grid to play the game of Tic Tac Toe

```html
<!-- index.html -->
<section class="board">
  <section class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </section>

  <section class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </section>

  <section class="row">
    <div class="cell"></div>
    <div class="cell"></div>
    <div class="cell"></div>
  </section>
</section>
```

 3. Add some styles to give the board the appearance of a `#` pound / hash
    symbol, as if drawn using four lines, whilst making the board stand out from
    the background

```css
/* style.css */
body {
  background-color: lightgray;
}

.cell {
  background-color: white;
  display: inline-block;
  height: 100px;
  width: 100px;
}

.cell + .cell {
  border-left: 2px solid black;
}

.hidden {
  display: none;
}

.row {
  display: flex;
}

.row:first-child .cell {
  border-bottom: 2px solid black;
}

.row:nth-child(2) .cell {
  border-bottom: 2px solid black;
}
```

 4. Add some logic to the board to draw either a `naught` or `cross`, by adding
    the class `naught` or `cross`, depending on which active player's turn it is
    and apply the character using styles with pseudo-content

```javascript
var players = {
  active: 'naught',
  inactive: 'cross'
}
var running = true;
var winner = ''

var board = document.querySelector('.board');
// var cells = document.querySelectorAll('.cell');
// var rows = document.querySelectorAll('.row');

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
  // check all Columns for line of same character class
  // rows[0][0] && rows[0][1] && rows[0][2] // Left Column
  // rows[1][0] && rows[1][1] && rows[1][2] // Middle Column
  // rows[2][0] && rows[2][1] && rows[2][2] // Right Column
}
function checkRows(player) {
  // check all Rows for line of same character class
  // rows[0][0] && rows[1][0] && rows[2][0] // Top Row
  // rows[0][1] && rows[1][1] && rows[2][1] // Middle Row
  // rows[0][2] && rows[1][2] && rows[2][2] // Bottom Row
}
function checkDiagonals(player) {
  // check all Diagonals for line of same character class
  // rows[0][0] && rows[1][1] && rows[2][2] // Major Diagonal
  // rows[2][0] && rows[1][1] && rows[0][2] // Minor Diagonal
}

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    winner = player;
    running = false;
  }
}
```

```css
/* style.css */
.cross:before,
.naught:before {
  display: block;
  font-size: 72px;
  text-align: center;
}

.naught:before {
  content: 'O';
}

.cross:before {
  content: 'X';
}
```

_This should stop/pause the game once a winner has been found_

 5. Whilst this completes a game for a winner, it still needs to handle a draw.
    A Draw or Tie being there are no moves left on the board, or more simply
    there are no cells left that do not contain a `naught` or `cross`

```javascript
// app.js
// ...
var cells = document.querySelectorAll('.cell');

var detailsEl = document.querySelector('.details');
var winnerEl = document.querySelector('.winner');

// ...

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
  } else if (allCellsFull()) {
    winnerEl.textContent = 'Draw!';
    running = false;
    detailsEl.classList.remove('hidden');
  }
}
```

_Since HTML Node Lists do not contain all Array prototype functions, instead
wrap the List in a Array or use it as the Array, whilst calling the `every`
function from Array; i.e. `[].every.call(HTMLNodeList, function(node) {})`_

 6. Also, display the winner or the draw to the screen

```html
<!-- index.html -->
  <footer class="details hidden">
    <h1 class="winner"></h1>
  <footer>
```

 7. Update the Font used to make the characters more round

```css
/* style.css */
body {
  font-family: 'Open Sans', 'Helvetica', 'Arial', sans-serif;
}
```

```html
<!-- index.html -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:400" rel="stylesheet">
```

 8. Add a reset button to clear the board to play again, instead of replying on
    refreshing the page. This button will essential strip all `.cell` elements
    of their `naught` or `cross` properties, whilst hiding the winner details

```html
<!-- index.html -->
<footer class="details hidden">
  <h1 class="winner"></h1>
  <button class="reset">Clear board</button>
<footer>
```

```javascript
// app.js
var resetBtn = document.querySelector('button.reset');

// ...

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
  running = true;
}

resetBtn.addEventListener('click', resetBoard);
```

 9. There is something missing ... No line is being drawn when the winner is
    found, which makes the winning move or finished game look odd. Lets add a
    line that draw from `div` to another for the winning move


```javascript
// app.js
function resetBoard() {
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
  });
  detailsEl.classList.add('hidden');
  document.body.removeChild(document.querySelector('.winning-move'));
  running = true;
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
      console.log(possibleWinStates[key].cells[0], possibleWinStates[key].cells[1], 'black', 5);
    }
  });
}
```

_The draw line code was adapted to draw from the center of the element, rather
the corner or edge of a `div`, and to build a HTML element rather than append
text as HTML._

_The code itself calculates the center of the given `div` elements, via a
`getBoundingClientRect` function that returns details about the dimensions of a
HTML Node. From there the length of the line between the two `div` elements can
be determine, as well as the angle of the line ..._

10. Add some colours to differentiate the different pieces on the board; for the
    naughts, crosses and the line

```javascript
function drawWinningLine() {
  Object.keys(possibleWinStates).forEach(function (key) {
    if (possibleWinStates[key].draw) {
      connect(possibleWinStates[key].cells[0], possibleWinStates[key].cells[1], 'green', 5);
    }
  });
}
```

```css
/* style.css */
.naught:before {
  color: blue;
  content: 'O';
}

.cross:before {
  color: red;
  content: 'X';
}
```

11. Look at implementing some of the bonus extensions; like
    > * Keep track of multiple game rounds with a win counter

    - Have a variable to keep track of rounds played
    - Increase Round counter on reset or win
    - Update Round Display after increase

```html
<!-- indx.html -->
<section class="scoreboard">
  <p>Round <span class="rounds">0</span></p>
</section>
```

```javascript
// app.js
var rounds = 0;

var roundsEl = document.querySelector('.rounds');

function updateRound() {
  rounds++;
  roundsEl.textContent = rounds;
}

function resetBoard() {
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
  });
  detailsEl.classList.add('hidden');
  document.body.removeChild(document.querySelector('.winning-move'));
  updateRound(); // <-- This line is new
  running = true;
}
```

12. Since a scoreboard has been built within the page, lets keep track of wins
    as well, for either `naughts` or `crosses`

```html
<!-- indx.html -->
<section class="scoreboard">
  <p>Round <span class="rounds">0</span></p>
  <table class="wins">
    <caption>Wins</caption>
    <tr>
      <th>Naughts</th>
      <th>Crosses</th>
    </tr>
    <tr>
      <td class="naught">0</td>
      <td class="cross">0</td>
    </tr>
  </table>
</section>
```

```javascript
// app.js
var wins = {
  naught: 0,
  cross: 0
};

// - var winner; <-- Remove this line
var winsEl = document.querySelector('.wins');
var naughtWinsEl = winsEl.querySelector('.naught');
var crossWinsEl = winsEl.querySelector('.cross');

function updateWins(winner) {
  winnerEl.textContent = winner + ' Wins!';
  wins[winner]++;

  naughtWinsEl.textContent = wins.naught;
  crossWinsEl.textContent = wins.cross;
}

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    updateWins(player);
    running = false;
    detailsEl.classList.remove('hidden');
    drawWinningLine();
  } else if (allCellsFull()) {
    winnerEl.textContent = 'Draw!';
    running = false;
    detailsEl.classList.remove('hidden');
  }
}
```

```css
/* style.css */
.wins td,
.wins th {
  padding: 5px;
  text-align: center;
}

.wins th {
  border-bottom: 1px solid black;
}

.wins td + td {
  border-left: 1px solid black;
}
```

  _Update styles to keep `.board` naughts and crosses separate to `.scoreboard`
  wins for naughts and crosses_


```css
/* style.css */
.board .naught:before {
  color: blue;
  content: 'O';
}

.board .cross:before {
  color: red;
  content: 'X';
}
```

13. Update styles to stack `.board` and `.scoreboard` on small screen, otherwise
    side by side on larger screens. Also, wrap the `.board` and `.scoreboard` in
    a `.container`, with `footer` as part of `.scoredboard`

```css
/* style.css */
.container {
  width: 100%;
}

@media (min-width: 600px) {
  .container {
    display: flex;
    justify-content: space-around;
  }
}
```

```html
<div class="container">
  <section class="board"><!-- ... --></section>

  <section class="scoreboard">
    <!-- ... -->

    <footer class="details hidden">
      <h1 class="winner"></h1>
      <button class="reset">Clear board</button>
    </footer>
  </section>
</div>
```

14. Look at implementing some of the bonus extensions; like
    > * **Research** **LocalStorage** or **SessionStorage** to persist data
    >   locally to allow games to continue after page refresh or loss of
    >   internet connectivity

> ## Example
>
> The following snippet accesses the current domain's local Storage object and
> adds a data item to it using Storage.setItem().
>
> ```javascript
> localStorage.setItem('myCat', 'Tom');
> ```
>
> The syntax for reading the localStorage item is as follows:
>
> ```javascript
> var cat = localStorage.getItem('myCat');
> ```
>
> The syntax for removing the localStorage item is as follows:
>
> ```javascript
> localStorage.removeItem('myCat');
> ```
>
> -- [Window.localStorage - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

  Effectively `localStorage` is a key-value type storage, which means as long as
  serialize and deserialize type of methods are used, we can quickly store
  and/or retrieve our data; e.g.

```javascript
// app.js
var gameState = {
  rounds: 0,
  players: {
    active: 'naught',
    inactive: 'cross'
  },

  wins: {
    naught: 0,
    cross: 0
  },

  running: true
};

function restoreGameState() {
  gameState = {
    rounds: localStorage.getItem('gameState-rounds'),
    players: {
      active: localStorage.getItem('gameState-players-active'),
      inactive: localStorage.getItem('gameState-players-inactive')
    },

    wins: {
      naught: localStorage.getItem('gameState-wins-naught'),
      cross: localStorage.getItem('gameState-wins-cross')
    },

    running: localStorage.getItem('gameState-running')
  };
};

function storeGameState(currentState) {
  localStorage.setItem('gameState-rounds', gameState.rounds);
  localStorage.setItem('gameState-players-active', gameState.players.active);
  localStorage.setItem('gameState-players-inactive', gameState.players.inactive);
  localStorage.setItem('gameState-wins-naught', gameState.wins.naught);
  localStorage.setItem('gameState-wins-cross', gameState.wins.cross);
  localStorage.setItem('gameState-running', gameState.running);
};

// ...

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    updateWins(player);
    gameState.running = false;
    storeGameState(gameState);
    detailsEl.classList.remove('hidden');
    drawWinningLine();
  } else if (allCellsFull()) {
    winnerEl.textContent = 'Draw!';
    gameState.running = false;
    detailsEl.classList.remove('hidden');
  }
}

// ...

// document ready
(function() {
  restoreGameState();
})();
```

_Update rest of the game to reflect new `gameState` object_

However, whilst implementing `localStorage` it initializes the Game state will
`null` if there was no prior state; i.e. the first game; thus functions to
initialize the Game State and clearing, with a default state, were required.

```javascript
// app.js
var gameState = {};
var defaultGameState = {
  rounds: 0,
  players: {
    active: 'naught',
    inactive: 'cross'
  },

  wins: {
    naught: 0,
    cross: 0
  },

  running: true
};

function clearGameState() {
  storeGameState(defaultGameState);
}

function initializeGameState() {
  if (!localStorage.getItem('gameState-running')) {
    clearGameState();
  }
}

(function() {
  initializeGameState();
  restoreGameState();
})();
```

_Updating the Scoreboard is also required in order to display the loaded Local
Storage data on page load / ready_

```javascript
// app.js
function updateScoreboard() {
  roundsEl.textContent = gameState.rounds;
  naughtWinsEl.textContent = gameState.wins.naught;
  crossWinsEl.textContent = gameState.wins.cross;
}

// ...
(function() {
  initializeGameState();
  restoreGameState();
  updateScoreboard();
})();
```

15. Whilst implementing `localStorage` two bugs occur:
    * Unhandled removal of winning line NOT drawn on Tie, and
    * Not keeping track of Tie games, internally or on the scoreboard

```html
<!-- index.html -->
<table class="wins">
  <thead>
    <caption>Wins</caption>
  </thead>
  <tbody>
    <tr>
      <th>Naughts</th>
      <th>Crosses</th>
      <th>Ties</th>
    </tr>
    <tr>
      <td class="naught">0</td>
      <td class="cross">0</td>
      <td class="tie">0</td>
    </tr>
  </tbody>
</table>
```

```javascript
// app.js
var defaultGameState = {
  rounds: 0,
  players: {
    active: 'naught',
    inactive: 'cross'
  },

  wins: {
    naught: 0,
    cross: 0,
    tie: 0
  },

  running: true
};

// ...

var winsEl = document.querySelector('.wins');
// ...
var tieWinsEl = winsEl.querySelector('.tie');

// ...

function restoreGameState() {
  gameState = {
    // ...
    wins: {
      // ...
      tie: localStorage.getItem('gameState-wins-tie')
    },
    // ...
  };
};

function storeGameState(currentState) {
  // ...
  localStorage.setItem('gameState-wins-tie', currentState.wins.tie);
  // ...
};

// ...

function updateScoreboard() {
  roundsEl.textContent = gameState.rounds;
  naughtWinsEl.textContent = gameState.wins.naught;
  crossWinsEl.textContent = gameState.wins.cross;
  tieWinsEl.textContent = gameState.wins.tie;
}

// ...

function checkForWinner(player) {
  if (checkCols(player) || checkRows(player) || checkDiagonals(player)) {
    updateWins(player);
    gameState.running = false;
    storeGameState(gameState);
    detailsEl.classList.remove('hidden');
    drawWinningLine();
  } else if (allCellsFull()) {
    updateWins('tie'); // <-- This Line!!!
    winnerEl.textContent = 'Draw!';
    gameState.running = false;
    detailsEl.classList.remove('hidden');
    storeGameState(gameState);
  }
}

function resetBoard() {
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
  });
  detailsEl.classList.add('hidden');
  removeWinningLine(); // <-- This Line!!!
  updateRound();
  gameState.running = true;
  storeGameState(gameState);
}

// ...

function removeWinningLine() {
  var lineEl = document.querySelector('.winning-move');
  if (lineEl) { document.body.removeChild(lineEl); }
}
```

16. Add a button to Reset / Wipe Game history saved between refreshes

```html
<!-- index.html -->
<section class="controls">
  <button class="reset-board">Clear Board</button>
  <button class="reset-scores">Clear Scores</button>
  <button class="reset-all">Clear All</button>
</section>
```

```javascript
// app.js
var controls = document.querySelector('.controls');
var resetBoardBtn = controls.querySelector('.reset-board');
var resetScoresBtn = controls.querySelector('.reset-scores');
var resetAllBtn = controls.querySelector('.reset-all');

// ...

function clearBoard() {
  cells.forEach(function(cell) {
    cell.classList.remove('naught');
    cell.classList.remove('cross');
  });
  detailsEl.classList.add('hidden');
  removeWinningLine();
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

// ...

// document ready
(function() {
  board.addEventListener('click', placePiece);

  resetBoardBtn.addEventListener('click', resetBoard);
  resetScoresBtn.addEventListener('click', resetScores);
  resetAllBtn.addEventListener('click', resetAll);

  initializeGameState();
  restoreGameState();
  updateScoreboard();
})();
```

_Also, refactored add event listeners into document ready function_

17. But what if I replaced the text content style for naughts and crosses, with
    either an actual image, or some more animated like a Scalar Vector Graphic
    (`svg`).

    So this part was looking more at a way of animating the drawing of naughts
    and crosses, which would require either some weird `div` elements; like the
    one currently used to draw the winning line across the board cells, or
    generating new ones to build a cross using two lines, two linear gradients
    with transparent colours and for a circle an empty `div` with a square
    height & width, but a overly round border; the only problem is they would
    not easily animate as a if they were being drawn; more like fading or moving
    into existence using CSS animations.

    However, came across the following CSS-Tricks blog post:

    - [How SVG Line Animation Works | CSS-Tricks](https://css-tricks.com/svg-line-animation-works/)

    That details drawing an SVG using a dashed line to draw in polyline shapes,
    going from a zero dash-offset to a large enough dash-offset for a single
    dash to encompass an entire shape, then tweening between the two states;
    giving it the effect of something drawing the elements onto the page.

    Looking at the
    [Mozilla Developer Network documentation on `svg`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Basic_Shapes)
    I found the shapes we need; a circle and a line.

```svg
<!-- Circle / Naught -->
<svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <circle class="path" cx="25" cy="25" r="20" stroke="blue" fill="transparent" stroke-width="5"/>
</svg>

<!-- Cross / 'X' -->
<svg width="50" height="50" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <line class="first-stroke" x1="0" x2="50" y1="0" y2="50" stroke="red" stroke-width="5"/>
  <line class="second-stroke" x1="50" x2="0" y1="0" y2="50" stroke="red" stroke-width="5"/>
</svg>
```

Then with some slight animation CSS, it can be animated as if being drawn when
rendered within the page.

```css
/*
- assets/svg/cross.svg
- assets/svg/naught.svg
*/
.path,
.first-stroke,
.second-stroke {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: dash 5s linear forwards;
}

.second-stroke {
  animation-delay: 0.5s;
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
```

With these new assets they can be added to the page as either `img` or `iframe`;
like so:

```html
<img src="assets/svg/cross.svg">
<img src="assets/svg/naught.svg">

<!-- or -->

<iframe src="assets/svg/cross.svg"></iframe>
<iframe src="assets/svg/naught.svg"></iframe>
```

However, using `img` means it would be easier to replace its `src` attribute
with something else if another bonus extension criteria is to fulfilled.
