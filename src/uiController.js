import updateDisplay from "./display";
import { setTempUnit, setLocation, getFormattedData } from "./weatherData";

//Grab DOM elements:

const toggleSwitch = document.querySelector(".checkbox");
const form = document.getElementById("search-area");
const searchBox = document.getElementById("input-box");
const errorDiv = document.querySelector(".error");

//Event listeners:

toggleSwitch.addEventListener("click", toggleTempUnit);
searchBox.addEventListener("input", conductLiveSearch);
form.addEventListener("submit", searchWeather);

function toggleTempUnit() {
  if (toggleSwitch.checked) {
    setTempUnit("C");
  } else {
    setTempUnit("F");
  }
  render();
}

function conductLiveSearch(e) {
  e.preventDefault();
  setLocationAndRender();
}

function searchWeather(e) {
  e.preventDefault();
  if (searchBox.value === "") {
    errorDiv.textContent = "Enter a location name or ZIP!";
  } else {
    setLocationAndRender();
  }
}

function setLocationAndRender() {
  setLocation(searchBox.value);
  render();
}

function clearElement(element) {
  element.value = "";
  element.innerHTML = "";
}

const render = async () => {
  try {
    const formattedData = await getFormattedData();
    updateDisplay(formattedData);
    clearElement(errorDiv);
  } catch (error) {
    if (searchBox.value !== "") {
      errorDiv.textContent = "Location not found";
    } else {
      errorDiv.textContent = "";
    }
  }
};

export default render;
