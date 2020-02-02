// array for checking neighbours
const checkId = [
  { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: +1 },
  { row: 0, col: -1 }, { row: 0, col: +1 },
  { row: +1, col: -1 }, { row: +1, col: 0 }, { row: +1, col: +1 }];

export class Board {
  constructor(width, height) {
    // create array
    const board = [];

    // create array with objects
    for (let row = 0; row < height; row += 1) {
      board[row] = [];
      for (let col = 0; col < width; col += 1) {
        board[row][col] = { fill: 0, state: 'hidden' };
      }
    }

    this.board = board;
  }

  drawBombs(numBomb) {
    // drawing bombs
    for (let bomb = 0; bomb < numBomb; bomb += 1) {
      let rows = Math.floor(Math.random() * this.board.length);
      let cols = Math.floor(Math.random() * this.board[rows].length);
      if (this.board[rows][cols].fill === 9) {
        do {
          rows = Math.floor(Math.random() * this.board.length);
          cols = Math.floor(Math.random() * this.board[rows].length);
        } while (this.board[rows][cols].fill === 9);
        this.board[rows][cols].fill = 9;
      } else {
        this.board[rows][cols].fill = 9;
      }
    }
    // assign numbers
    for (let row = 0; row < this.board.length; row += 1) {
      for (let col = 0; col < this.board[row].length; col += 1) {
        let numberOfNeighbourBombs = 0;
        if (this.board[row][col].fill === 9) continue; // ignore elements with bombs

        for (let check = 0; check < checkId.length; check += 1) {
          const dir = checkId[check];

          if (this.isInBounds(row + dir.row, col + dir.col)) {
            if (this.board[row + dir.row][col + dir.col].fill === 9) {
              numberOfNeighbourBombs += 1;
            }
          }

          this.board[row][col].fill = numberOfNeighbourBombs;
        }
      }
    }
  }

  isInBounds(row, col) {
    return row >= 0 && col >= 0 && row < this.board.length && col < this.board[row].length;
  }

  // play
  boardCheck(row, col) {
    // click on empty
    if (this.board[row][col].fill === 0 && this.board[row][col].state === 'hidden') {
      this.board[row][col].state = 'revealed'; // change state on clicked element

      for (let check = 0; check < checkId.length; check += 1) { // check neighbours
        const dir = checkId[check];

        if (this.isInBounds(row + dir.row, col + dir.col)) { // pass valid index
          if (this.board[row + dir.row][col + dir.col].fill > 0 && this.board[row + dir.row][col + dir.col].fill <= 8 && this.board[row + dir.row][col + dir.col].state === 'hidden') // if neighbours are numbers, reveal them
          { this.board[row + dir.row][col + dir.col].state = 'revealed'; }

          if (this.board[row + dir.row][col + dir.col].fill === 0 && this.board[row][col].state === 'hidden') // if neighbour is 0, reveal it and start userClicks() on it
          { this.board[row + dir.row][col + dir.col].state = 'revealed'; }
          this.boardCheck(row + dir.row, col + dir.col);
        }
      }
    }

    // click on numbers
    if (this.board[row][col].fill > 0 && this.board[row][col].fill <= 8 && this.board[row][col].state === 'hidden') {
      this.board[row][col].state = 'revealed';
    }

    // click on bomb
    if (this.board[row][col].fill === 9 && this.board[row][col].state === 'hidden') {
      for (let rows = 0; rows < this.board.length; rows += 1) {
        for (let cols = 0; cols < this.board[rows].length; cols += 1) {
          this.board[rows][cols].state = 'revealed'; // reveal all elements of board
        }
      }
    }
  }

  flagBoard(row, col) {
    if (this.board[row][col].state === 'hidden') {
      this.board[row][col].state = 'flagged';
    } else if (this.board[row][col].state === 'flagged') {
      this.board[row][col].state = 'hidden';
    }
  }

  dblClick(row, col) {
    if (this.board[row][col].fill > 0 && this.board[row][col].fill < 9 && this.board[row][col].state === 'revealed') {
      let numberOfBombsFlagged = 0;
      const numberOfBombs = this.board[row][col].fill;
      for (let check = 0; check < checkId.length; check += 1) { // check neighbours
        const dir = checkId[check];

        if (this.isInBounds(row + dir.row, col + dir.col)) {
          if (this.board[row + dir.row][col + dir.col].fill === 9 && this.board[row + dir.row][col + dir.col].state === 'flagged') {
            numberOfBombsFlagged += 1;
          }
        }
      }

      for (let check = 0; check < checkId.length; check += 1) { // check neighbours
        const dir = checkId[check];
        if (numberOfBombs === numberOfBombsFlagged) {
          if (this.isInBounds(row + dir.row, col + dir.col)) {
            this.boardCheck(row + dir.row, col + dir.col);
          }
        } else if (numberOfBombs !== numberOfBombsFlagged) {
          for (let rows = 0; rows < this.board.length; rows += 1) {
            for (let cols = 0; cols < this.board[rows].length; cols += 1) {
              this.board[rows][cols].state = 'revealed'; // reveal all elements of board
            }
          }
        }
      }
    }
  }

  isLose() {
    // true if any board element with bomb is revealed
    for (let row = 0; row < this.board.length; row += 1) {
      for (let col = 0; col < this.board[row].length; col += 1) {
        if (this.board[row][col].fill === 9 && this.board[row][col].state === 'revealed') {
          return true;
        }
      }
    }
    return false;
  }

  isWin() {
    // true if all elements without bombs are revealed
    let numberOfNoBombs = 0;
    let numberOfNoBombsRevealed = 0;

    for (let row = 0; row < this.board.length; row += 1) {
      for (let col = 0; col < this.board[row].length; col += 1) {
        if (this.board[row][col].fill !== 9) {
          numberOfNoBombs += 1;
        }

        if (this.board[row][col].fill !== 9 && this.board[row][col].state === 'revealed') {
          numberOfNoBombsRevealed += 1;
        }
      }
    }

    return numberOfNoBombs === numberOfNoBombsRevealed;
  }
}
