# WDI Project 1

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
