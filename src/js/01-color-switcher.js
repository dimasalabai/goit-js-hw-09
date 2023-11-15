import '../css/common.css';

const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};
let timerID = null;

refs.start.addEventListener('click', startChanges);
refs.stop.addEventListener('click', stopChanges);

function startChanges() {
  timerID = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  refs.stop.disabled = false;
  refs.start.disabled = true;
}

function stopChanges() {
  clearInterval(timerID);

  refs.start.disabled = false;
  refs.stop.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
