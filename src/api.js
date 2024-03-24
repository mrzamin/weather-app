//Variable for IP Lookup API:
let location = "auto:ip";
let tempUnit = "F";

//Location Getter:
const getLocation = () => {
  return location;
};

const setLocation = (newLocation) => {
  location = newLocation;
};

const getTempUnit = () => {
  return tempUnit;
};

const setTempUnit = (input) => {
  tempUnit = unit;
};
//Call to the Weather API:
async function getWeatherData(location) {
  const API = `https://api.weatherapi.com/v1/forecast.json?key=31e2c850d3b84d2ab73234210241703&q=${location}&days=5&aqi=no/ip.json`;
  const response = await fetch(API, { mode: "cors" });
  const weatherData = await response.json();
  //   console.log(weatherData);
  return weatherData;
}

//Filter API data down to current weather:
const getCurrentWeather = async (location) => {
  const weatherData = await getWeatherData(location);
  const currentWeather = {
    icon: weatherData.current.condition.icon,
    location: weatherData.location.name,
    country: weatherData.location.country,
    date: weatherData.location.localtime,
    description: weatherData.current.condition.text,
    temp: (function Temp() {
      if (tempUnit == "F") {
        return `${weatherData.current.temp_f}°F`;
      } else {
        return `${weatherData.current.temp_c}°C`;
      }
    })(),
    uv: weatherData.current.uv,
    humidity: weatherData.current.humidity,
    wind: weatherData.current.wind_mph,
  };
  return currentWeather;
};

const getForecast = async (location) => {
  const weatherData = await getWeatherData(location);
  console.log(weatherData);
  const forecastDays = [];

  weatherData.forecast.forecastday.forEach((day) => {
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

const getAllWeather = async (location) => {
  const currentWeather = await getCurrentWeather(location);
  const forecast = await getForecast(location);
  const threeDayForecast = forecast.slice(0, 3);
  const allWeatherData = [currentWeather, threeDayForecast];
  return allWeatherData;
};

export { setTempUnit, switchTempUnit, getLocation, setLocation, getAllWeather };
