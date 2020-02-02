const button = document.querySelectorAll('.button');
const arrowRight = document.querySelectorAll('.arrow-right');

function changeToBlue() {
  arrowRight.forEach((arrow) => {
    arrow.classList.remove('blue');
    arrow.classList.add('black');
    document.getElementById('reset').style.color = '#ff5719';
    document.getElementById('submit').style.color = '#ff5719';
  });
}

function changeToBlack() {
  arrowRight.forEach((arrow) => {
    arrow.classList.remove('black');
    arrow.classList.add('blue');
    document.getElementById('reset').style.color = '#2f55a4';
    document.getElementById('submit').style.color = '#2f55a4';
  });
}

button.forEach((buttons) => {
  buttons.onmouseover = () => {
    changeToBlue();
  };
  buttons.onmouseleave = () => {
    changeToBlack();
  };
});
