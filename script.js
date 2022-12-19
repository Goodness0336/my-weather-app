let dateNow = document.querySelector("#date");
let timeNow = document.querySelector("#time");

let currentTime = new Date();
let hours = currentTime.getHours();
let minutes = currentTime.getMinutes();
let day = currentTime.getDay();
let month = currentTime.getMonth();
let year = currentTime.getFullYear();
let date = currentTime.getDate();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateNow.innerHTML = `${days[day]}, ${date} ${months[month]} ${year}`;

timeNow.innerHTML = `${hours}:${minutes}`;



function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-sm-4">
                    <div class="border p-2 mt-1 rounded shadow">
                         <div class="weather-forecast-date">${formatDay(
                           forecastDay.dt
                         )}</div>
                          <span class="Tmax">${Math.round(
                            forecastDay.temp.max
                          )}°</span> <span id="Tmin">${Math.round(
          forecastDay.temp.min
        )}°</span>
                        <div id="icon">
                            <img src="http://openweathermap.org/img/wn/${
                              forecastDay.weather[0].icon
                            }@2x.png" alt="sunny icon" />
                        </div>
                    </div>
                
          
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}



function getForecast(coordinates) {
    let apiKey = "8cd9be374c7c96c39a9fe73f4bf2f055";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function showWeather(response) {
  let mainTemperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#first-temp");
  tempElement.innerHTML = mainTemperature;
  let cities = document.querySelector("#city-name");
  cities.innerHTML = response.data.name;
  let humidityValue = document.querySelector("#humidity");
  humidityValue.innerHTML = response.data.main.humidity;
  let windValue = document.querySelector("#wind");
  windValue.innerHTML = Math.round(response.data.wind.speed);
  let weatherComment = document.querySelector("#weather-description");
  weatherComment.innerHTML = response.data.weather[0].description;
  let iconElement =document.querySelector("#first-icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  
  celsiusTemperature = response.data.main.temp;

 getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "5d0e9c3de2e1dcb8062c765f9113a5b5";
  let city = document.querySelector("#type-city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeather);
}


let celsiusTemperature = null 


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "5d0e9c3de2e1dcb8062c765f9113a5b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showCurrentWeatherLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", showCurrentWeatherLocation);


function showCelsiusValue(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusValue = document.querySelector("#first-temp");
  celsiusValue.innerHTML = Math.round(celsiusTemperature);
}


function showFahrenheitValue(event) {
  event.preventDefault();
  let celsiusValue = document.querySelector("#first-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitValue = (celsiusTemperature * 9) / 5 + 32;
  celsiusValue.innerHTML = Math.round(fahrenheitValue);
}

  let fahrenheitLink = document.querySelector("#fahrenheit-unit");
  fahrenheitLink.addEventListener("click", showFahrenheitValue);
  let celsiusLink = document.querySelector("#celsius-unit");
  celsiusLink.addEventListener("click", showCelsiusValue);
  