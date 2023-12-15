const cityInput = document.querySelector('#city-input');
const stateInput = document.querySelector('#state-input')
const weatherCard = document.querySelector('.card-container')
const form = document.querySelector('form');

const weatherURL = `http://localhost:4004/api/weather`;

const submitHndlr = event => {
    event.preventDefault();

    if (!cityInput.value) {
        alert('you must enter a city name')
        return;
    } 

    let body = {
        city: cityInput.value,
        state: stateInput.value
    }

    axios.post(`${weatherURL}`, body)
    .then(response => {
        displayWeather(response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

const displayWeather = data => {
    const cardContainer = document.querySelector('.card-container');
    const weatherCard = document.createElement('div');

    weatherCard.innerHTML = `<p>front end code works. just needs to display the already deconstructed weather data from back end.</p>`
    cardContainer.appendChild(weatherCard);
    
    console.log(data);
}

form.addEventListener('submit', submitHndlr)