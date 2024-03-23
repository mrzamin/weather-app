//Grab DOM elements:
const forecastContainer = document.querySelector(".forecast-days-container");
const forecastHeader = document.querySelector(".forecast-header");
//Populate the forecast display container:
const renderForecast = async (data) => {
  const weatherData = await data;
  const weather = weatherData[0];
  const forecast = weatherData[1];

  forecastHeader.textContent = `Forecast for ${weather.location}`;

  forecast.forEach((day) => {
    const forecastCard = document.createElement("div");
    forecastCard.classList.add("forecast-card");

    const icon = new Image();
    icon.src = `${weather.icon}`;

    const iconContainer = document.createElement("div");
    iconContainer.classList.add("icon-container");
    iconContainer.appendChild(icon);

    const date = document.createElement("div");
    date.textContent = `${weather.date}`;

    const description = document.createElement("div");
    description.textContent = `${weather.description}`;

    const tempHigh = document.createElement("div");
    tempHigh.textContent = `${forecast.high_f}`;

    const tempLow = document.createElement("div");
    tempLow.textContent = `${forecast.low_f}`;

    const childElements = [iconContainer, date, description, tempHigh, tempLow];

    childElements.forEach((element) => {
      forecastCard.appendChild(element);
    });
    forecastContainer.appendChild(forecastCard);
  });
};

export { renderForecast };
