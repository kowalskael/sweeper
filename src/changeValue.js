const rows = document.getElementById('height');
const columns = document.getElementById('width');
const numBombs = document.getElementById('bombNums');

document.querySelector('.up-cols').addEventListener('click', () => {
  if (columns.value < 32) {
    columns.value = parseFloat(columns.value) + 1;
  }
});

document.querySelector('.down-cols').addEventListener('click', () => {
  if (columns.value > 8) {
    columns.value = parseFloat(columns.value) - 1;
  }
});

document.querySelector('.up-rows').addEventListener('click', () => {
  if (rows.value < 32) {
    rows.value = parseFloat(rows.value) + 1;
  }
});

document.querySelector('.down-rows').addEventListener('click', () => {
  if (rows.value > 8) {
    rows.value = parseFloat(rows.value) - 1;
  }
});

document.querySelector('.up-bombNums').addEventListener('click', () => {
  if (numBombs.value < 30) {
    numBombs.value = parseFloat(numBombs.value) + 1;
  }
});

document.querySelector('.down-bombNums').addEventListener('click', () => {
  if (numBombs.value > 10) {
    numBombs.value = parseFloat(numBombs.value) - 1;
  }
});
