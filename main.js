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
    //sunset & sunrise
  const secSunrise = data.sys.sunrise;
  const secSunset = data.sys.sunset;

  /**
   *
   *convert the seconds to the local time
   * @param {*} sec
   */
  function convertTime(sec) {
    const time = new Date(sec * 1000);
    return time.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit"
    });
} 
  const timeSunrise = convertTime(secSunrise);
  const timeSunset = convertTime(secSunset);
   // cloudy
   const cloudsData = data.weather[0].description;
   const cloudiness = cloudsData.charAt(0).toUpperCase() + cloudsData.slice(1);
   const tableDataLi = document.createElement("li");
   const tableDataUl = document.querySelector(".table .table-data");
   const tableTitle = document.querySelector(".table .table-title");
  
  tableTitle.style.display = "block";
  tableDataUl.innerHTML = "";
  tableDataLi.innerHTML = `
            <ul>
                <li>${wind}</li>
                <li>${timeSunrise}</li>
                <li>${timeSunset}</li>
                <li>${cloudiness}</li>
            </ul>
        `;
  tableDataUl.appendChild(tableDataLi);
  }
  cityNameInput.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.keyCode === 13) {
      btnWeather.click();
    }
    if (cityNameInput.value === "") {
      alert("Enter your city name");
    }
    weatherInfo(cityNameInput.value);
   
  });
  btnCurrentLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      const currentLocation = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };
      weatherInfoCurrentLocation(
        currentLocation.latitude,
        currentLocation.longitude
      );
    });
  });
