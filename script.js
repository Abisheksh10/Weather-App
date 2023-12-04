function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeatherForMyLocation, handleLocationError);
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}

function showWeatherForMyLocation(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  getWeatherByCoordinates(latitude, longitude);
}

function handleLocationError(error) {
  console.error('Error getting location:', error.message);
  alert('Error getting location. Please enter a location manually.');
}

function getWeather() {
  const locationInput = document.getElementById('locationInput').value;

  if (!locationInput) {
    alert('Please enter a location.');
    return;
  }

  getWeatherByLocation(locationInput);
}

function getWeatherByLocation(location) {
  const apiKey = '1d96c15941820bb7dae155c4fe932916'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}

function getWeatherByCoordinates(latitude, longitude) {
  const apiKey = '1d96c15941820bb7dae155c4fe932916'; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data. Please try again.');
    });
}

function displayWeather(data) {
  const weatherInfoContainer = document.getElementById('weather-info');

  const cityName = data.name;
  const temperature = data.main.temp;
  const weatherDescription = data.weather[0].description;

  const weatherHTML = `
    <p>City: ${cityName}</p>
    <p>Condition: ${weatherDescription}</p>
    <p>Temperature: ${temperature}°C</p>
  `;

  weatherInfoContainer.innerHTML = weatherHTML;
}
