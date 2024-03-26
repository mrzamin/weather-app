import fetchWeatherData from "./api";

let location = "auto:ip"; //Use IP Lookup API (default) or user input
let tempUnit = "F"; //F or C (default: F)

//Format weather from API:

const getFormattedWeather = (weather) => {
  //Store current weather data in object:
  const formattedWeather = {
    location: weather.location.name,
    localTime: weather.location.localtime,
    date: weather.location.localtime,
    icon: weather.current.condition.icon,
    description: weather.current.condition.text,
    uv: weather.current.uv,
    humidity: weather.current.humidity,
    wind: weather.current.wind_mph,
    //If it is currently nighttime, return true:
    isNightTime: (function () {
      const iconURL = weather.current.condition.icon;
      return iconURL.includes("night");
    })(),
    temp: (function Temp() {
      if (tempUnit === "F") {
        return `${weather.current.temp_f}°F`;
      } else {
        return `${weather.current.temp_c}°C`;
      }
    })(),
  };
  return formattedWeather;
};

//Format forecast from API:

const getFormattedForecast = (weather) => {
  const forecastDays = [];

  weather.forecast.forecastday.forEach((day) => {
    const forecastDay = {
      icon: day.day.condition.icon,
      description: day.day.condition.text,
      date: day.date,
      high: (function Temp() {
        if (tempUnit === "F") {
          return `${day.day.maxtemp_f}°F`;
        } else {
          return `${day.day.maxtemp_c}°C`;
        }
      })(),
      low: (function Temp() {
        if (tempUnit === "F") {
          return `${day.day.mintemp_f}°F`;
        } else {
          return `${day.day.mintemp_c}°C`;
        }
      })(),
    };
    forecastDays.push(forecastDay);
  });

  return forecastDays;
};

//Variable getters and setters:

const getLocation = () => {
  return location;
};

const setLocation = (newLocation) => {
  location = newLocation;
};

const getTempUnit = () => {
  return tempUnit;
};

const setTempUnit = (newUnit) => {
  tempUnit = newUnit;
};

const getWeather = async (location) => {
  const weatherData = await fetchWeatherData(location);
  return weatherData;
};

//Get all formatted data:

const getFormattedData = async () => {
  const weather = await getWeather(location);
  const formattedWeather = getFormattedWeather(weather);
  const formattedForecast = getFormattedForecast(weather);
  const threeDayForecast = formattedForecast.slice(0, 3);
  const formattedData = [formattedWeather, threeDayForecast];
  return formattedData;
};

export { getTempUnit, setTempUnit, getLocation, setLocation, getFormattedData };
