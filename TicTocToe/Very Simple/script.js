// Initialize game state variables
let px = -1;      // X-coordinate of the last clicked cell
let py = -1;      // Y-coordinate of the last clicked cell
let pph = [];     // Array to keep track of occupied cells

/**
 * Handles button clicks and updates the game state.
 * @param {number} x - The X-coordinate of the clicked cell.
 * @param {number} y - The Y-coordinate of the clicked cell.
 */
function clicking(x, y) {
    px = x;
    py = y;
    let pp = `${px}${py}`;
    
    // Update the cell's content
    document.getElementById(pp).innerHTML = "X";
    
    // Add the clicked cell to the list of occupied cells
    if (!pph.includes(pp)) {
        pph.push(pp);
        
        // Check if there is a winner
        if (checkWin(px, py)) {
            console.log("win");
        }
    }
}

/**
 * Checks if the current move results in a win.
 * @param {number} x - The X-coordinate of the last move.
 * @param {number} y - The Y-coordinate of the last move.
 * @returns {boolean} - True if there's a winning combination, otherwise false.
 */
function checkWin(x, y) {
    return checkDirection(x, y, 1, 0) ||  // horizontal
           checkDirection(x, y, 0, 1) ||  // vertical
           checkDirection(x, y, 1, 1) ||  // positive diagonal
           checkDirection(x, y, 1, -1);   // negative diagonal
}

/**
 * Checks if there is a winning combination in a given direction.
 * @param {number} x - The X-coordinate of the last move.
 * @param {number} y - The Y-coordinate of the last move.
 * @param {number} dx - The change in X-direction.
 * @param {number} dy - The change in Y-direction.
 * @returns {boolean} - True if there is a winning combination in the direction.
 */
function checkDirection(x, y, dx, dy) {
    let count = 1; // Count the current cell
    count += countInDirection(x, y, dx, dy);   // Count in positive direction
    count += countInDirection(x, y, -dx, -dy); // Count in negative direction
    return count >= 3; // Check if there are 3 or more in a row
}

/**
 * Counts the number of consecutive cells occupied in a given direction.
 * @param {number} x - The X-coordinate of the starting cell.
 * @param {number} y - The Y-coordinate of the starting cell.
 * @param {number} dx - The change in X-direction.
 * @param {number} dy - The change in Y-direction.
 * @returns {number} - The count of consecutive occupied cells.
 */
function countInDirection(x, y, dx, dy) {
    let count = 0;
    while (true) {
        x += dx;
        y += dy;
        let pp = `${x}${y}`;
        if (!pph.includes(pp)) break; // Stop if cell is empty
        count++;
    }
    return count;
}
