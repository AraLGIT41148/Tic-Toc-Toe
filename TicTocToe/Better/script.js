let px = -1;
let py = -1;
let pph = [];
let currentPlayer = "X"; // X starts first

function clicking(x, y) {
  px = x;
  py = y;
  let pp = `${px}${py}`;
  
  // Check if the cell is already taken
  if (pph.includes(pp)) {
    console.log("Cell already taken!");
    return;
  }

  // Place the current player's mark on the button
  document.getElementById(pp).innerHTML = currentPlayer;
  pph.push(pp);
  
  // Check for a win or a draw
  if (checkWin(px, py)) {
    document.getElementById('winnerMessage').innerText = `Player ${currentPlayer} wins!`;
    document.getElementById('overlay').style.display = 'flex'; // Show the overlay
    document.querySelector('.container').classList.add('hidden'); // Hide the game board
  } else if (pph.length === 9) { // Check for a draw
    document.getElementById('winnerMessage').innerText = 'It\'s a draw!';
    document.getElementById('overlay').style.display = 'flex'; // Show the overlay
    document.querySelector('.container').classList.add('hidden'); // Hide the game board
  } else {
    // Switch to the next player
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(x, y) {
  // Check for a win in all directions
  return checkDirection(x, y, 1, 0) ||  // Horizontal
         checkDirection(x, y, 0, 1) ||  // Vertical
         checkDirection(x, y, 1, 1) ||  // Positive diagonal
         checkDirection(x, y, 1, -1);   // Negative diagonal
}

function checkDirection(x, y, dx, dy) {
  let count = 1;
  count += countInDirection(x, y, dx, dy);
  count += countInDirection(x, y, -dx, -dy);
  return count >= 3; // If there are 3 or more marks, it's a win
}

function countInDirection(x, y, dx, dy) {
  let count = 0;
  while (true) {
    x += dx;
    y += dy;
    let pp = `${x}${y}`;
    if (!pph.includes(pp)) break; // Break if no cell exists
    if (document.getElementById(pp).innerHTML !== currentPlayer) break; // Break if the marks do not match
    count++;
  }
  return count;
}

function restartGame() {
  // Reset the game state
  pph = [];
  currentPlayer = "X";
  document.getElementById('message').innerText = `Player ${currentPlayer}'s turn`;
  document.getElementById('overlay').style.display = 'none'; // Hide the overlay
  document.querySelector('.container').classList.remove('hidden'); // Show the game board
  const buttons = document.querySelectorAll('.grid button');
  buttons.forEach(button => button.innerHTML = ""); // Clear the button contents
}
