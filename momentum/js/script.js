// time

const time = document.querySelector('.time');
const day = document.querySelector('.day');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const focus = document.querySelector('.focus');
const btnBg = document.querySelector('.btn-bg');
const btnQuote = document.querySelector('.btn-quote');

const showTime = () => {
  const today = new Date();
  const hour = today.getHours();
  const min = addZero(today.getMinutes());
  const sec = addZero(today.getSeconds());

  time.innerHTML = `${hour}<span>:</span>${min}<span>:</span>${sec}`;

  if (min === '00' && sec === '00') {
    setBgGreet();
    showDay();
    getWeather();
  }

  setTimeout(showTime, 1000);
};

const addZero = (n) => parseInt(n, 10) < 10 ? `0${n}` : n;

// day

const showDay = () => {
  const today = new Date();
  const options = {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  };

  day.innerHTML = today.toLocaleString("en-US", options);
};
