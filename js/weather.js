const weather = document.querySelector('.js-weather');
const API_KEY = '2636860697f6e43f421741831c8ab06f';
const COORDS = 'coords';

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then(
      (res) =>
        (weather.innerText = `
    Current Temperature is  ${res.main.temp}°C  @ ${res.name}`)
    );
}

function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position) {
  const latitude = position.coords.latitude;
  const logitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    logitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, logitude);
}

function handleGeoError() {
  console.log('Can access geo location');
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}
function loadCoords() {
  const loadCoords = localStorage.getItem(COORDS);
  if (loadCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadCoords);
    getWeather(parseCoords.latitude, parseCoords.logitude);
  }
}

function init() {
  loadCoords();
}

init();
