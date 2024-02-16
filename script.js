const temperatureScaleToggler = document.getElementById(
  'temperature-scale-toggler'
);
const temperatureTogglerInfo = document.getElementById(
  'temperature-toggler-info'
);
const searchStatus = document.getElementById('search-status');
const searchButton = document.getElementById('search-button');
const searchBar = document.getElementById('search-bar');
const locationName = document.getElementById('location-name');
const locationRegion = document.getElementById('location-region');
const locationCountry = document.getElementById('location-country');
const condition = document.getElementById('condition');
const conditionIcon = document.getElementById('condition-icon');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');
const windSpeed = document.getElementById('wind-speed');
const locationTitle = document.getElementById('location-title');
const humidityTitle = document.getElementById('humidity-title');
const windTitle = document.getElementById('wind-title');
const feelsLikeTitle = document.getElementById('feels-like-title');
const conditionTitle = document.getElementById('condition-title');
let temperatureScale = 'c';
let weatherData;
let temperatureSource = 'weatherData.current.temp_c';
let feelsLikeSource = 'weatherData.current.feelslike_c';
let wasDataReceived = false;
let oneSuccessfulSearch = false;
let locationNameTempValue;
let locationRegionTempValue;
let locationCountryTempValue;
let conditionTempValue;
let conditionIconTempValue;
let temperatureTempValueC;
let temperatureTempValueF;
let humidityTempValue;
let feelsLikeTempValueC;
let feelsLikeTempValueF;
let windKPHTempValue;
let windMPHTempValue;

function toggleTemperatureScale() {
  if (temperatureScale === 'c') {
    temperatureScaleToggler.style.justifyContent = 'flex-end';
    temperatureTogglerInfo.textContent = 'F°';
    temperatureScale = 'f';
    temperatureSource = 'temperatureTempValueF';
    feelsLikeSource = 'feelsLikeTempValueF';
  } else {
    temperatureScaleToggler.style.justifyContent = 'flex-start';
    temperatureTogglerInfo.textContent = 'C°';
    temperatureScale = 'c';
    temperatureSource = 'temperatureTempValueC';
    feelsLikeSource = 'feelsLikeTempValueC';
  }
  setWeather();
}

async function getWeather() {
  if (!searchBar.value) {
    return null;
  }
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=13e369673c374816a78184619241302&q=${searchBar.value}`
    );
    weatherData = await response.json();
    wasDataReceived = true;

    storeWeatherValues();
    cleanUpFields();
    oneSuccessfulSearch = true;
    setWeather();
    conditionIcon.style.display = 'block';
    searchStatus.textContent = null;
  } catch (e) {
    wasDataReceived = false;
    searchStatus.textContent = `Sorry, we couldn't find the weather information for '${searchBar.value}'`;
  }
}

function storeWeatherValues() {
  locationNameTempValue = weatherData.location.name;
  locationRegionTempValue = weatherData.location.region;
  locationCountryTempValue = weatherData.location.country;
  conditionTempValue = weatherData.current.condition.text;
  conditionIconTempValue = `https://${weatherData.current.condition.icon}`;
  temperatureTempValueC = weatherData.current.temp_c;
  temperatureTempValueF = weatherData.current.temp_f;
  humidityTempValue = weatherData.current.humidity;
  feelsLikeTempValueC = weatherData.current.feelslike_c;
  feelsLikeTempValueF = weatherData.current.feelslike_f;
  windKPHTempValue = weatherData.current.wind_kph;
  windMPHTempValue = weatherData.current.wind_mph;
}

function setWeather() {
  if (oneSuccessfulSearch == true) {
    locationName.innerText = `${locationNameTempValue}, ${locationRegionTempValue}, ${locationCountryTempValue}`;
    condition.innerText = conditionTempValue;
    conditionIcon.src = conditionIconTempValue;
    temperature.innerText =
      eval(temperatureSource) + ` ${temperatureScale.toUpperCase()}°`;
    humidity.innerText = humidityTempValue;
    feelsLike.innerText =
      eval(feelsLikeSource) + ` ${temperatureScale.toUpperCase()}°`;
    windTitle.innerText = 'Wind:';
    windSpeed.innerText = `${windKPHTempValue} kph / ${windMPHTempValue} mph`;
    locationTitle.innerText = 'Location:';
    humidityTitle.innerText = 'Humidity:';
    windTitle.innerText = 'Wind:';
    feelsLikeTitle.innerText = 'Feels like:';
    conditionTitle.innerText = 'Condition:';
  } else {
    /* Do nothing */
  }
}

function handleSearchEnter(e) {
  if (e.keyCode === 13) {
    getWeather();
  }
}

function cleanUpFields() {
  searchBar.value = '';
}

temperatureScaleToggler.onclick = toggleTemperatureScale;
searchButton.onclick = getWeather;
searchBar.onkeyup = handleSearchEnter;
