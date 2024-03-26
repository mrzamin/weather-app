//Import dependencies:

import moment from "moment";

//Grab DOM elements:

const forecastContainer = document.querySelector(".forecast-days-container");
const forecastHeader = document.querySelector(".forecast-header");
const weatherContainer = document.querySelector(".weather-container");

//Display background theme:

const displayBackground = (weather) => {
  const body = document.body;
  const isNightTime = weather.nightTime;
  const condition = weather.description;
  if (isNightTime) {
    body.classList.add("night-theme");
    body.classList.remove("default-theme", "sunny-theme", "stormy-theme");
  } else if (condition === "Sunny") {
    body.classList.add("sunny-theme");
    body.classList.remove("default-theme", "night-theme", "stormy-theme");
  } else {
    body.classList.add("default-theme");
    body.classList.remove("sunny-theme", "stormy-theme", "night-theme");
  }
};

//Populate weather container:

const displayWeather = (weather, forecast) => {
  clearContainer(weatherContainer);

  //Primary card elements:

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

  const temp = document.createElement("div");
  temp.classList.add("temp");
  temp.textContent = `${weather.temp}`;

  const description = document.createElement("div");
  description.textContent = `${weather.description} - Last updated ${moment()
    .startOf("minute")
    .fromNow()}`;

  const high = document.createElement("div");
  high.classList.add("max-temp");
  high.textContent = `High: ${forecast[0].high}`;

  const low = document.createElement("div");
  low.textContent = `Low: ${forecast[0].low}`;
  low.classList.add("min-temp");

  const childElements = [heading, temp, description, high, low];
  childElements.forEach((element) => {
    weatherCard.appendChild(element);
  });
  weatherContainer.appendChild(weatherCard);

  //Secondary card elements:

  const date = document.createElement("div");
  date.classList.add("local-time");
  date.textContent = "Today: ";
  const dateFormatted = document.createElement("span");
  dateFormatted.textContent = `${moment(weather.localTime).format("LL")}`;
  date.appendChild(dateFormatted);

  const wind = document.createElement("div");
  wind.classList.add("wind");
  wind.textContent = `Wind: ${weather.wind} mph`;

  const humidity = document.createElement("div");
  humidity.classList.add("humidity");
  humidity.textContent = `Humidity: ${weather.humidity}%`;

  const uvIndex = document.createElement("div");
  uvIndex.classList.add("uv");
  uvIndex.textContent = `UV Index: ${weather.uv}`;

  const secondaryData = [date, wind, humidity, uvIndex];

  const weatherStatsContainer = document.createElement("div");
  weatherStatsContainer.classList.add("weather-stats-container");

  secondaryData.forEach((item) => {
    weatherStatsContainer.appendChild(item);
  });
  weatherContainer.appendChild(weatherStatsContainer);
};

//Populate forecast container:

const displayForecast = (weather, forecast) => {
  clearContainer(forecastHeader);
  clearContainer(forecastContainer);

  forecastHeader.textContent = `Forecast for ${weather.location}`;

  forecast.forEach((day) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const icon = new Image();
    icon.src = `${day.icon}`;

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

    const high = document.createElement("div");
    high.textContent = `H: ${day.high}`;

    const low = document.createElement("div");
    low.textContent = `L: ${day.low}`;

    const childElements = [
      iconContainer,
      weekday,
      date,
      description,
      high,
      low,
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

//Display weather, forecast, and background theme:

const updateDisplay = (data) => {
  const weather = data[0]; //object representing current weather
  const forecast = data[1]; //array of objects representing forecast days
  displayWeather(weather, forecast);
  displayForecast(weather, forecast);
  displayBackground(weather);
};

export default updateDisplay;
