//Variable for IP Lookup API:
let location = "auto:ip";

//Location Getter:
const getLocation = () => {
  return location;
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
    temp_f: weatherData.current.temp_f,
    temp_c: weatherData.current.temp_c,
    uv: weatherData.current.uv,
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
      high_c: day.day.maxtemp_c,
      high_f: day.day.maxtemp_f,
      low_c: day.day.mintemp_c,
      low_f: day.day.mintemp_f,
    };
    forecastDays.push(forecastDay);
  });

  console.log(forecastDays);
};

export { getLocation, getWeatherData, getCurrentWeather, getForecast };
