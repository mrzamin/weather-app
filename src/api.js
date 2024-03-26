//Fetch weather data from Weather API:
export default async function fetchWeatherData(location) {
  const API = `https://api.weatherapi.com/v1/forecast.json?key=31e2c850d3b84d2ab73234210241703&q=${location}&days=5&aqi=no/ip.json`;
  const response = await fetch(API, { mode: "cors" });
  const weatherData = await response.json();
  return weatherData;
}
