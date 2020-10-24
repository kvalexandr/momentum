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

// background

const randomArrayImageIndex = () => Array(20).fill(0).map((e, i) => (i + 1)).sort(() => .5 - Math.random()).slice(0, 6);
const arrDayBg = [];
arrDayBg.push(...randomArrayImageIndex());
arrDayBg.push(...randomArrayImageIndex());
arrDayBg.push(...randomArrayImageIndex());
arrDayBg.push(...randomArrayImageIndex());

const getDay = (h) => {
  if (h >= 0 && h < 6) {
    return 'night';
  }

  if (h >= 6 && h < 12) {
    return 'morning';
  }

  if (h >= 12 && h < 18) {
    return 'day';
  }

  if (h >= 18 && h <= 23) {
    return 'evening';
  }
}

const setBgGreet = () => {
  const today = new Date();
  const hour = today.getHours();
  const day = getDay(hour);

  viewBgImage(day, hour);

  switch (day) {
    case 'night':
      greeting.innerHTML = 'Good night, ';
      return;
    case 'morning':
      greeting.innerHTML = 'Good morning, ';
      return;
    case 'day':
      greeting.innerHTML = 'Good day, ';
      return;
    case 'evening':
      greeting.innerHTML = 'Good evening, ';
      return;
  }
};

const viewBgImage = (day, imageIndex) => {
  const body = document.querySelector('body');
  const img = document.createElement('img');
  const src = `/assets/images/${day}/${addZero(arrDayBg[imageIndex])}.jpg`
  img.src = src;
  btnBg.disabled = true;
  img.onload = () => {
    body.style.backgroundImage = `url(${src})`;
    setTimeout(function () { btnBg.disabled = false; }, 1000);
  };
};
