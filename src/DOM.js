// create DOM representation of board
export default class DOM {
  firstClick = true;

  constructor(board, boardContainer, bombs, timer) {
    this.board = board;
    this.bombs = bombs;
    this.timer = timer;
    for (let row = 0; row < this.board.board.length; row += 1) {
      const rows = document.createElement('div');
      this.boardContainer = boardContainer;
      this.boardContainer.classList.add('play');
      this.boardContainer.classList.remove('lose');
      this.boardContainer.append(rows);

      for (let col = 0; col < this.board.board[row].length; col += 1) {
        const cols = document.createElement('div');
        cols.setAttribute('data-row', `${row}`);
        cols.setAttribute('data-col', `${col}`);
        rows.append(cols);
        const field = this.board.board[row][col];
        field.element = cols;
        field.element.classList.add('play');

        // Left click - fires boardCheck on element click
        field.element.addEventListener('click', this.clickHandler);

        // Right click - flag elements
        field.element.addEventListener('contextmenu', (e) => {
          this.firstClick = false;
          e.preventDefault();
          this.board.flagBoard(row, col);
          this.update();
        });

        // Dblclick fast revealing
        field.element.addEventListener('dblclick', () => {
          this.firstClick = false;
          this.board.dblClick(row, col);
          this.update();
        });
      }
    }
  }

  clickHandler = (event) => {
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));
    // if this was first click and board.isLose()
    if (this.firstClick) {
      if (this.board.board[row][col].fill === 9) {
        do { // if firstClick is bomb, drawBombs again
          // clear previous board fill & state
          for (let prevRow = 0; prevRow < this.board.board.length; prevRow += 1) {
            for (let prevCol = 0; prevCol < this.board.board[prevRow].length; prevCol += 1) {
              this.board.board[prevRow][prevCol].fill = 0;
              this.board.board[prevRow][prevCol].state = 'hidden';
            }
          }
          this.board.board[row][col].element.classList.remove('revealed');
          this.board.drawBombs(this.bombs);
          this.board.boardCheck(row, col);
        } while (this.board.isLose());
        this.update();
      }
      this.board.boardCheck(row, col);
      this.update();
      this.firstClick = false;
    } else {
      this.board.boardCheck(row, col);
      this.update();
    }
  }

  update() {
    let flagTimer = false;
    for (let row = 0; row < this.board.board.length; row += 1) {
      for (let col = 0; col < this.board.board[row].length; col += 1) {
        const field = this.board.board[row][col];

        field.element.classList.add(field.state);
        field.element.setAttribute('data-value', `${this.board.board[row][col].fill}`);

        // update changes made on board
        // color, state, numbers and strings

        if (field.state === 'hidden') {
          field.element.classList.add('hidden');
          field.element.classList.remove('flagged');
        }

        // if user expose empty square, change state to revealed
        if (field.fill === 0 && field.state === 'revealed') {
          field.element.classList.add('revealed');
          field.element.classList.remove('hidden');
        }

        // if user expose empty square, change state to revealed and assign number
        if (field.fill > 0 && field.fill < 9) {
          if (field.state === 'revealed') {
            field.element.classList.remove('hidden');
            field.element.classList.add('revealed');
          }
        }

        // if user expose empty square, change state to revealed and assign string
        if (field.fill === 9 && field.state === 'revealed') {
          field.element.classList.remove('hidden');
          field.element.classList.add('revealed');
        }

        if (field.state === 'flagged') {
          field.element.classList.add('flagged');
          field.element.classList.remove('hidden');
        }

        if (this.board.isLose()) {
          this.timer.stop();
          field.element.classList.remove('play');
          field.element.classList.add('lose');
          this.boardContainer.classList.add('lose');
          document.getElementById('timer').style.color = '#2f55a4';
          flagTimer = true;
          setTimeout(() => { document.getElementById('animation').style.display = 'block'; }, 0);
          setTimeout(() => { document.getElementById('animation').style.display = 'none'; }, 3500);
        } else if (this.board.isWin()) {
          this.timer.stop();
          field.element.classList.remove('play');
          field.element.classList.add('win');
          document.getElementById('timer').style.color = '#2f55a4';
          this.boardContainer.classList.add('win');
          if (field.fill === 9) {
            field.element.classList.remove('revealed');
            field.element.classList.remove('flagged');
            field.element.classList.add('win');
          }
        }
      }
    }
    if (flagTimer) {
      const timer = document.getElementById('timer');
      timer.innerText = timer.innerText + ' WOW! ';
    }
  }
}
