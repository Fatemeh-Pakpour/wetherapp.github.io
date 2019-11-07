// variables HTML elements
const btnWeather = document.querySelector("#button-search");
const cityNameInput = document.querySelector("#city-name");
const btnCurrentLocation = document.querySelector("#button-currentLocation");

// Api Key form https://openweathermap.org/
const apiKey = "0c6db5d597b4b735d735f6d9bedd78c2";

/**
 *function get the weather information from fetching api
 *
 * @param {*} cityName
 */
function weatherInfo(cityName) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?&q=" +
        cityName +
        "&units=metric&appid=" +
        apiKey
    )
      .then(resp => resp.json())
      .then(json => {
        displayWeatherInfo(json);
      });
  }
  function displayWeatherInfo(data) {
    // weather icon
  
    const iconCode = data.weather[0].icon;
    const iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
    document.querySelector("#weather-icon").setAttribute("src", iconUrl);
  
    // location
    document.querySelector("#location").innerHTML = data.name;
  
    // temperature
    document.querySelector("#temp").innerHTML = `${data.main.temp} &degC`;
  
    // wind speed
    const wind = data.wind.speed;
  }