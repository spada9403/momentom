const COORDS = "coords";
const API_KEY = "8000074595d62580f0e130d7b7a53733";
const weatherForm = document.querySelector(".geo"),
  weather = weatherForm.querySelector(".js-weather");
cloudy = weatherForm.querySelector(".weather");

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature}℃ @ ${json.sys.country}º${place}`;
      cloudy.innerText = `${json.weather[0].description}`;
    });
  //api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
}

function saceCoords(coordsOBj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsOBj));
}

function handleGeoSucces(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saceCoords(coordsObj);
  getWeather(latitude, longitudec);
}
function handleGeoError() {
  console.log("cant");
}

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parseCoords = JSON.parse(loadedCoords);
    getWeather(parseCoords.latitude, parseCoords.longitude);
  }
}
function init() {
  loadCoords();
}
init();
