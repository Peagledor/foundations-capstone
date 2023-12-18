const zipInput = document.querySelector('#zip-input');
const cardContainer = document.querySelector('.card-container')
const form = document.querySelector('form');
let weatherCard;

const weatherURL = `http://localhost:4004/api/weather`;

const submitHndlr = event => {
    event.preventDefault();
    
    if (!zipInput.value) {
        alert('you must enter a zip code')
        return;
    } 

    

    let body = {
        zipCode: zipInput.value,
    }

    axios.post(`${weatherURL}`, body)
    .then(response => {
        console.log("received response:", response)
        const weatherData = response.data.current;

        displayWeather(weatherData);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const displayWeather = data => { // takes in response data
    
    if(!weatherCard){
        weatherCard = document.createElement('div'); // creates html dive inside card container
        weatherCard.classList.add(".card-body");
    }

    weatherData = data
    console.log("passed in data:", weatherData) // Remove logs 
    const dt = new Date(data.dt * 1000);
    const sunrise = new Date(data.sunrise * 1000).toTimeString();
    const sunset = new Date(data.sunset * 1000).toTimeString();
    
    weatherCard.innerHTML = `
    <div class ="card-body">
    <h4 class="card-date">${dt.toDateString()}</h4>
    <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png"
    class="card-img-top"
    alt =${weatherData.weather[0].description}/>
    <h3 class="card-title">${weatherData.temp}&deg;F</h3> 
        <h3 class="main-label">${weatherData.weather[0].main}</h3>
        <div class="text-body">
            <p class="card-text">Sunrise: ${sunrise}</p>
            <p class="card-text">Sunset: ${sunset}</p>
            <p class="card-text">Pressure: ${weatherData.pressure}mb</p>
            <p class="card-text">Humidity: ${weatherData.humidity}%</p>
            <p class="card-text">UV Index: ${weatherData.uvi}</p>
            <p class="card-text">Dewpoint: ${weatherData.dew_point}</p>
            <p class="card-text">Wind: ${weatherData.wind_speed}m/s, ${weatherData.wind_deg}&deg;</p>
        </div>            
    </div>`    

    
    cardContainer.appendChild(weatherCard); // creates weather card iside the card container
    
}

form.addEventListener('submit', submitHndlr)