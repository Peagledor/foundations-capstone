const cityInput = document.querySelector('#city-input');
const weatherCard = document.querySelector('#weather-card')
const form = document.querySelector('form');

const weatherURL = `http://localhost:4004/api/weather`;

const submitHndlr = event => {
    event.preventDefault();

    if (cityInput.value < 0) {
        alert('you must enter a city name')
        return
    } 

    let body = {
        city: cityInput.value
    }

    axios.post(`${weatherURL}`, body)
    .then(displayWeather())
    .catch(console.log('error'));
};

const displayWeather = data => {
    const weatherCard = document.createElement('div');

    weatherCard.innerHTML = `<p>weather ${data}!</p>`
    
}

form.addEventListener('submit', submitHndlr);