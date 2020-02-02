import { Board } from './Board';
import DOM from './DOM';
import { Timer } from './Timer';


document.getElementById('play').style.display = 'none';

document.getElementById('submit').onclick = () => {
  document.getElementById('start').style.display = 'none'; // game menu hidden
  document.getElementById('play').style.display = 'flex'; // show play area

  const rows = document.getElementById('height').value;
  const columns = document.getElementById('width').value;
  const numBombs = document.getElementById('bombNums').value;
  const board = document.getElementById('board');

  const boardTest = new Board(columns, rows);
  boardTest.drawBombs(numBombs);
  console.log(boardTest);

  const timer = document.getElementById('timer');
  const stopwatch = new Timer(timer);
  stopwatch.start();

  const boardDraw = new DOM(boardTest, board, numBombs, stopwatch);
  boardDraw.update();
};

document.getElementsByClassName('button').onmouseover = () => {
  document.querySelectorAll('.arrow-right').classList.remove('blue');
  document.querySelectorAll('.arrow-right').classList.add('black');
};

document.getElementById('reset').onclick = () => {
  document.getElementById('start').style.display = 'flex'; // game menu hidden
  document.getElementById('play').style.display = 'none'; // show play area
  document.getElementById('timer').style.color = 'black';
  document.getElementById('height').value = '8';
  document.getElementById('width').value = '8';
  document.getElementById('bombNums').value = '10';
  document.getElementById('play').style.borderColor = 'grey';
  document.body.style.background = '#ffffff';

  const boardElements = document.getElementById('board');
  while (boardElements.firstChild) {
    boardElements.removeChild(boardElements.firstChild);
  }
};
