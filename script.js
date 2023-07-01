
function fetchWeather() {
  var countryName = document.getElementById("country-input").value;

  fetch('countries.json')
    .then(response => response.json())
    .then(data => {
      var country = data.find(entry => entry.country.toLowerCase() === countryName.toLowerCase());

      if (country) {
        var latitude = country.latitude;
        var longitude = country.longitude;

        var weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`;

        fetch(weatherUrl)
          .then(response => response.json())
          .then(weatherData => {
            var temperature = weatherData.current_weather.temperature;

            var resultElement = document.getElementById("result");
            resultElement.innerHTML = `Weather in ${countryName}: ${temperature}°C`;

            // Set background color based on weather
            var body = document.getElementsByTagName("body")[0];

            if (temperature <= 10) {
              body.style.backgroundColor = "#6495ED"; 
            } else if (temperature > 10 && temperature <= 25) {
              body.style.backgroundColor = "#FFD700"; 
            } else {
              body.style.backgroundColor = "#FF4500"; 
            }
          })
          .catch(error => {
            console.error("Weather Error:", error);
          });
      } else {
        document.getElementById("result").innerHTML = "Unable to fetch weather for the given country.";
      }
    })
    .catch(error => {
      console.error("Countries Error:", error);
    });
}

var currentYear = new Date().getFullYear();
    document.getElementById("current-year").textContent = currentYear;