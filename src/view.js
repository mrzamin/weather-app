//Import dependencies:
import moment from "moment";

//Grab DOM elements:
const forecastContainer = document.querySelector(".forecast-days-container");
const forecastHeader = document.querySelector(".forecast-header");
const weatherContainer = document.querySelector(".weather-container");

//Populate weather container:
const renderWeather = (weather) => {
  clearContainer(weatherContainer);

  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  const icon = new Image();
  icon.src = `${weather.icon}`;

  const iconContainer = document.createElement("div");
  iconContainer.classList.add("icon-container");
  iconContainer.appendChild(icon);

  const locationHeading = document.createElement("h2");
  locationHeading.classList.add("location-heading");
  locationHeading.textContent = `Current weather for ${weather.location}`;

  const description = document.createElement("div");
  description.textContent = `${weather.description}`;

  const temp = document.createElement("div");
  temp.textContent = `${weather.temp}`;

  const lastUpdated = document.createElement("div");
  lastUpdated.textContent = `Last updated ${moment()
    .startOf("minute")
    .fromNow()}`;

  const childElements = [
    iconContainer,
    locationHeading,
    description,
    temp,
    lastUpdated,
  ];
  childElements.forEach((element) => {
    weatherCard.appendChild(element);
  });

  weatherContainer.appendChild(weatherCard);
  //Additional data:
  const wind = document.createElement("div");
  wind.textContent = `Wind: ${weather.wind}mph`;

  const humidity = document.createElement("div");
  humidity.textContent = `Humidity: ${weather.humidity}`;

  const uv = document.createElement("div");
  uv.textContent = `UV Index: ${weather.uv}`;

  const additionalData = [wind, humidity, uv];

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
  renderWeather(weather);
  renderForecast(weather, forecast);
};

export { renderWeatherAndForecast };
