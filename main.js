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
       console.log(json);
      });
  }