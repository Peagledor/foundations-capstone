const zipInput = document.querySelector('#zip-input');
const cardContainer = document.querySelector('.card-container')
const form = document.querySelector('form');
const saveBtn = document.querySelector('.save-button');
const savedLocBtn = document.querySelector('.saved-location')
const savedContainer = document.querySelector('.saved-container')


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
        // console.log("received response:", response)
        const weatherData = response.data;

        displayWeather(weatherData);
     
        zipInput.value = ""
    })
    .catch(error => {
        console.error('Error:', error);
    });

}

const displayWeather = data => { 
    if(!weatherCard){
        weatherCard = document.createElement('div'); 
    }
    weatherData = data
    // console.log("passed in data:", weatherData) // Remove logs 
    const dt = new Date(data.dt * 1000);
    const sunrise = new Date(data.sunrise * 1000).toTimeString();
    const sunset = new Date(data.sunset * 1000).toTimeString();
    
    weatherCard.innerHTML = `
    <div class="card-body">
                <h3 class="card-date">${dt.toDateString()}</h3>
                <h1 class="city-label">${weatherData.city}</h1>
                <img src="https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png"
                class="card-img-top"
                alt =${weatherData.weather[0].description}/>
                <h1 class="card-title">${weatherData.temp}&deg;F</h1> 
                <h2 class="main-label">${weatherData.weather[0].main}</h2>
                <div class="text-body">
                    <p class="card-text">Sunrise: ${sunrise}</p>
                    <p class="card-text">Sunset: ${sunset}</p>
                    <p class="card-text">Pressure: ${weatherData.pressure}mb</p>
                    <p class="card-text">Humidity: ${weatherData.humidity}%</p>
                    <p class="card-text">UV Index: ${weatherData.uvi}</p>
                    <p class="card-text">Dewpoint: ${weatherData.dew_point}</p>
                    <p class="card-text">Wind: ${weatherData.wind_speed}m/s, ${weatherData.wind_deg}&deg;</p>
                </div>
                <button value="${weatherData.zip}" name="${weatherData.city}" class="save-button">Save Location</button>
            </div>`


    cardContainer.appendChild(weatherCard);    
};

const getSaved = e => { //need to see if I can build this function ouside the event listener. working for now.
        const data = e.target.value;
        const zip = data
        // console.log("zip:", zip)
        let body = {
            zipCode: zip
        }
        axios.post(`${weatherURL}`, body)
        .then(response => {
        // console.log("received response:", response)
        const weatherData = response.data;

        displayWeather(weatherData);
    })
        .catch(error => {
        console.error('Error:', error);
    });
}

const addToSaved = event => {
    event.preventDefault();
    const data = event.target;
    const savedLocation = data.value;
    const cityName = data.name;
    // console.log("saved location:", savedLocation)


    const savedCard = document.createElement('div');
    savedCard.innerHTML = 
        `<div>
            <button class="saved-location" value=${savedLocation}>${cityName}</button>
        </div>`
    savedContainer.appendChild(savedCard);    
};



form.addEventListener('submit', submitHndlr);

cardContainer.addEventListener('click', e => {
    if(e.target.classList.contains("save-button")){
        addToSaved(e)
    }
});

savedContainer.addEventListener('click', getSaved);