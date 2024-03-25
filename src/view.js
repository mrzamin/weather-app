//Import dependencies:
import moment from "moment";

import { getWeatherCondition } from "./api";

//Grab DOM elements:
const forecastContainer = document.querySelector(".forecast-days-container");
const forecastHeader = document.querySelector(".forecast-header");
const weatherContainer = document.querySelector(".weather-container");

const changeBackgroundColor = (condition) => {
  const body = document.body;
  if (condition === "Sunny") {
    body.classList.add("blue-background");
    body.classList.remove("default-background");
  } else {
    body.classList.add("default-background");
    body.classList.remove("blue-background");
  }
};

//Populate weather container:
const renderWeather = (weather, forecast) => {
  clearContainer(weatherContainer);

  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  const icon = new Image();
  icon.classList.add("weather-icon");
  icon.src = `${weather.icon}`;

  const location = document.createElement("h2");
  location.classList.add("location-heading");
  location.textContent = `Current weather for ${weather.location}`;

  const heading = document.createElement("div");
  heading.classList.add("current-weather-heading");
  heading.appendChild(icon);
  heading.appendChild(location);

  const description = document.createElement("div");
  description.textContent = `${weather.description} - Last updated ${moment()
    .startOf("minute")
    .fromNow()}`;

  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.textContent = `${weather.temp}`;

  // const lastUpdated = document.createElement("div");
  // lastUpdated.textContent = `Last updated ${moment()
  //   .startOf("minute")
  //   .fromNow()}`;

  const tempHigh = document.createElement("div");
  tempHigh.classList.add("max-temp");
  tempHigh.textContent = `H: ${forecast[0].high}`;

  const tempLow = document.createElement("div");
  tempLow.textContent = `L: ${forecast[0].low}`;
  tempLow.classList.add("min-temp");

  const childElements = [heading, temp, description, tempHigh, tempLow];
  childElements.forEach((element) => {
    weatherCard.appendChild(element);
  });

  weatherContainer.appendChild(weatherCard);
  //Additional data:

  const localTime = document.createElement("div");
  localTime.classList.add("local-time");
  localTime.textContent = "Today: ";
  const localTimeFormatted = document.createElement("span");
  localTimeFormatted.textContent = `${moment(weather.localTime).format("LL")}`;
  localTime.appendChild(localTimeFormatted);

  const wind = document.createElement("div");
  wind.classList.add("wind");
  wind.textContent = `Wind: ${weather.wind}mph`;

  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = `Humidity: ${weather.humidity}`;

  const uv = document.createElement("div");
  uv.classList.add("uv");
  uv.textContent = `UV Index: ${weather.uv}`;

  const additionalData = [localTime, wind, humidity, uv];

  const weatherStatsContainer = document.createElement("div");
  weatherStatsContainer.classList.add("weather-stats-container");

  additionalData.forEach((item) => {
    weatherStatsContainer.appendChild(item);
  });
  weatherContainer.appendChild(weatherStatsContainer);
};

//Populate forecast container:
const renderForecast = (weather, forecast) => {
  clearContainer(forecastHeader);
  clearContainer(forecastContainer);

  forecastHeader.textContent = `Forecast for ${weather.location}`;

  forecast.forEach((day) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const icon = new Image();
    icon.src = `${day.icon}`;

    if (day.description === "Sunny") {
      icon.style.width = "60px";
      icon.style.height = "60px";
    }

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    iconContainer.appendChild(icon);

    const weekday = document.createElement("div");
    const formattedWeekday = moment(day.date).format("dddd");
    weekday.textContent = `${formattedWeekday}`;

    const date = document.createElement("div");
    const formattedDate = moment(day.date).format("LL");
    date.textContent = `${formattedDate}`;

    const description = document.createElement("div");
    description.textContent = `${day.description}`;

    const tempHigh = document.createElement("div");
    tempHigh.textContent = `H: ${day.high}`;

    const tempLow = document.createElement("div");
    tempLow.textContent = `L: ${day.low}`;

    const childElements = [
      iconContainer,
      weekday,
      date,
      description,
      tempHigh,
      tempLow,
    ];

    childElements.forEach((element) => {
      forecastCard.appendChild(element);
    });
    forecastContainer.appendChild(forecastCard);
  });
};

//Clear a container:
const clearContainer = (container) => {
  container.innerHTML = "";
};

//Render weather and forecast together:
const renderWeatherAndForecast = async (data) => {
  const weatherData = await data;
  const weather = weatherData[0]; //object representing current weather
  const forecast = weatherData[1]; //array of objects representing forecast days
  const condition = getWeatherCondition();
  renderWeather(weather, forecast);
  renderForecast(weather, forecast);
  changeBackgroundColor(condition);
};

export { renderWeatherAndForecast };
