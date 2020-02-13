const rows = document.getElementById('height');
const columns = document.getElementById('width');
const numBombs = document.getElementById('bombNums');

document.querySelector('.up-cols').addEventListener('click', () => {
  if (columns.value < 10) {
    columns.value = parseFloat(columns.value) + 1;
  }
  if (columns.value > 9) {
    columns.style.color = '#ff5719';
  }
});

document.querySelector('.down-cols').addEventListener('click', () => {
  if (columns.value > 8) {
    columns.value = parseFloat(columns.value) - 1;
  }
  if (columns.value < 10) {
    columns.style.color = '#2f55a4';
  }
});

document.querySelector('.up-rows').addEventListener('click', () => {
  if (rows.value < 10) {
    rows.value = parseFloat(rows.value) + 1;
  }
  if (rows.value > 9) {
    rows.style.color = '#ff5719';
  }
});

document.querySelector('.down-rows').addEventListener('click', () => {
  if (rows.value > 8) {
    rows.value = parseFloat(rows.value) - 1;
  }
  if (rows.value < 10) {
    rows.style.color = '#2f55a4';
  }
});

document.querySelector('.up-bombNums').addEventListener('click', () => {
  if (numBombs.value < 30) {
    numBombs.value = parseFloat(numBombs.value) + 1;
  }
  if (numBombs.value > 29) {
    numBombs.style.color = '#ff5719';
  }
});

document.querySelector('.down-bombNums').addEventListener('click', () => {
  if (numBombs.value > 10) {
    numBombs.value = parseFloat(numBombs.value) - 1;
  }
  if (numBombs.value < 30) {
    numBombs.style.color = '#2f55a4';
  }
});
