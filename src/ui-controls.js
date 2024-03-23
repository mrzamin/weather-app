import { renderWeatherAndForecast } from "./view";
import { getLocation, setLocation, getAllWeather } from "./api";

const form = document.getElementById("search-box");
const searchBox = document.getElementById("input-box");
const errorDiv = document.querySelector(".error");

form.addEventListener("submit", searchWeather);

function searchWeather(e) {
  e.preventDefault();
  if (searchBox.value === "") {
    errorDiv.textContent = "Enter a location name or ZIP!";
  } else {
    setLocation(searchBox.value);
    render(e);
    clearElement(searchBox);
  }
}

function clearElement(element) {
  element.value = "";
  element.innerHTML = "";
}

const render = async (event) => {
  try {
    const location = getLocation();
    const locationData = await getAllWeather(location);
    renderWeatherAndForecast(locationData);
    clearElement(errorDiv);
  } catch (error) {
    errorDiv.textContent = "Location not found";
  }
};

export default render;
