const nasaApiUrl = 'https://data.nasa.gov/resource/gvk9-iz74.json';
const weatherApiKey = '25ce98a9d97844a6a7694126242010';

// Fetch NASA Facilities
function fetchNasaFacilities() {
    fetch(nasaApiUrl)
        .then(response => response.json())
        .then(nasaData => {
            console.log('NASA Data:', nasaData); // Log NASA facilities data

            nasaData.forEach(facility => {
                const latitude = facility.location.latitude;
                const longitude = facility.location.longitude;
                const location = `${facility.city}, ${facility.state}`;
                const facilityName = facility.facility;

                // Fetch weather data for the facility's location
                fetchWeatherData(facilityName, location, latitude, longitude);
            });
        })
        .catch(error => {
            console.error('Error fetching NASA facilities:', error);
        });
}

// Fetch weather data for given latitude and longitude
function fetchWeatherData(facilityName, location, lat, lon) {
    const weatherApiUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${lat},${lon}`;

    fetch(weatherApiUrl)
        .then(response => response.json())
        .then(weatherData => {
            console.log('Weather Data:', weatherData); // Log weather data

            const tempCelsius = weatherData.current.temp_c;
            const tempFahrenheit = (tempCelsius * 9/5) + 32; // Convert Celsius to Fahrenheit

            const facilityInfo = {
                name: facilityName,
                location: location,
                 temperatureC: tempCelsius,
                temperatureF: tempFahrenheit,
                condition: weatherData.current.condition.text
            };

            displayFacilityInfo(facilityInfo);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Display facility info and weather in the DOM inside a table
function displayFacilityInfo(facilityInfo) {
    const facilityTableBody = document.querySelector('#facilityList');
    
    // Create a new table row
    const tableRow = document.createElement('tr');

    // Insert facility name, location, and weather into the table row
    tableRow.innerHTML = `
        <td><strong>${facilityInfo.name}</strong></td>
        <td>${facilityInfo.location}</td>
        <td>Condition: ${facilityInfo.condition}, ${facilityInfo.temperatureC}°C / ${facilityInfo.temperatureF.toFixed(1)}°F</td>
    `;

    // Append the new row to the table body
    facilityTableBody.appendChild(tableRow);
}

// Start fetching data
fetchNasaFacilities();
