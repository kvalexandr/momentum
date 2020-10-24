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

// change bg

const changeBg = () => {
  let today = new Date();
  let hour = parseInt(today.getHours());

  return function () {
    hour += 1;
    hour = hour % 24;
    const day = getDay(hour);
    console.log(hour, arrDayBg[hour], day);
    viewBgImage(day, hour);
  }
}

btnBg.addEventListener('click', changeBg());

// get name

const getName = () => {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
};

// set name

const setName = (e) => {
  const newName = e.target.innerText.trim();

  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (newName !== '') {
        localStorage.setItem('name', newName);
      } else {
        getName();
      }
      name.blur();
    }
  } else {
    if (newName !== '') {
      localStorage.setItem('name', newName);
    } else {
      getName();
    }
  }
};

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
name.addEventListener('click', () => name.textContent = '');

// get focus

const getFocus = () => {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
};

// set focus

const setFocus = (e) => {
  const newFocus = e.target.innerText.trim();

  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (newFocus !== '') {
        localStorage.setItem('focus', newFocus);
      } else {
        getFocus();
      }
      focus.blur();
    }
  } else {
    if (newFocus !== '') {
      localStorage.setItem('focus', newFocus);
    } else {
      getFocus();
    }
  }
};

focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', () => focus.textContent = '');

//quote

const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btn = document.querySelector('.btn-quote');

async function getQuote() {
  const url = `https://api.chucknorris.io/jokes/random`;
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  });
  const data = await res.json();
  blockquote.textContent = data.value;
  figcaption.textContent = data.quoteAuthor;
}

document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

// weather

const weatherError = document.querySelector('.weather-error');
const weatherIcon = document.querySelector('.weather-icon');
const temp = document.querySelector('.temp');
const wind = document.querySelector('.wind');
const hum = document.querySelector('.hum');
const city = document.querySelector('.city');

async function getWeather() {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=beb0ca4fc07ad25d8c49454a88ed7158&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherError.textContent = '';
    weatherIcon.innerHTML = `<i class="owf owf-${data.weather[0].id}"></i>`;
    temp.textContent = `${Math.round(data.main.temp)} °C`;
    wind.textContent = `Wind: ${data.wind.speed} m/s`;
    hum.textContent = `Humidity: ${data.main.humidity} %`;
  } catch (e) {
    weatherIcon.innerHTML = ''
    temp.textContent = '';
    wind.textContent = '';
    hum.textContent = '';
    weatherError.textContent = `Erorr: City not found`;
  }
}

// get city

const getCity = () => {
  if (localStorage.getItem('city') === null) {
    city.textContent = 'Moscow';
  } else {
    city.textContent = localStorage.getItem('city');
  }
};

// set city

const setCity = (e) => {
  const newCity = e.target.innerText.trim();

  if (e.type === 'keypress') {
    if (e.which == 13 || e.keyCode == 13) {
      if (newCity !== '') {
        localStorage.setItem('city', newCity);
        getWeather();
      } else {
        getCity();
      }
      city.blur();
    }
  } else {
    if (newCity !== '') {
      localStorage.setItem('city', newCity);
      getWeather();
    } else {
      getCity();
    }
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
city.addEventListener('blur', setCity);
city.addEventListener('click', () => city.textContent = '');

// run

showTime();
showDay();
setBgGreet();
getName();
getFocus();
getCity();
