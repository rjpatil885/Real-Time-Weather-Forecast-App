let countries = [];

function loadCountries() {
    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            countries = data.map(country => ({
                country: country.name.common,
                latitude: country.latlng[0],
                longitude: country.latlng[1]
            }));
        })
        .catch(error => {
            console.error("Error fetching country data:", error);
        });
}

window.onload = loadCountries;

function fetchWeather() {
    var countryName = document.getElementById("country-input").value.trim().toLowerCase();
    var resultElement = document.getElementById("result");

    if (!countryName) {
        resultElement.innerHTML = "Please enter a country name.";
        return;
    }

    resultElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Fetching weather...';

    var country = countries.find(entry => entry.country.toLowerCase() === countryName);

    if (country) {
        var latitude = country.latitude;
        var longitude = country.longitude;

        var weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`;

        fetch(weatherUrl)
            .then(response => response.json())
            .then(weatherData => {
                var temperature = weatherData.current_weather.temperature;
                var body = document.getElementsByTagName("body")[0];
                var weatherClass = '';

                resultElement.innerHTML = `Weather in ${countryName.charAt(0).toUpperCase() + countryName.slice(1)}: ${temperature}°C`;

                if (temperature <= 10) {
                    body.className = 'cold';
                    addSnowflakes();
                } else if (temperature > 10 && temperature <= 25) {
                    body.className = 'warm';
                    removeSnowflakes();
                } else {
                    body.className = 'hot';
                    removeSnowflakes();
                    addSun();
                }
            })
            .catch(error => {
                console.error("Weather Error:", error);
                resultElement.innerHTML = "Error fetching weather data.";
            });
    } else {
        resultElement.innerHTML = "Unable to fetch weather for the given country.";
    }
}

function addSun() {
    if (!document.querySelector('.sun')) {
        var sun = document.createElement('div');
        sun.className = 'sun';
        document.body.appendChild(sun);
    }
}

function addSnowflakes() {
    if (!document.querySelector('.snowflake')) {
        for (let i = 0; i < 20; i++) {
            var snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.animationDuration = `${Math.random() * 5 + 5}s`;
            snowflake.innerHTML = '&#10052;';
            document.body.appendChild(snowflake);
        }
    }
}

function removeSnowflakes() {
    document.querySelectorAll('.snowflake').forEach(snowflake => {
        snowflake.remove();
    });
}

function removeSun() {
    var sun = document.querySelector('.sun');
    if (sun) sun.remove();
}

var currentYear = new Date().getFullYear();
document.getElementById("current-year").textContent = currentYear;
