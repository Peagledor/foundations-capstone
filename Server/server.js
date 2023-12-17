const SERVER_PORT = 4004;
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');


const KEY = '662a129c5b90d8e37ab11bad63eab67f';
// const zipURL = `http://api.openweathermap.org/geo/1.0/zip?zip=80205&appid=abe81164b6408f7f78955541dba4dd84`;
// const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${`lat`}&lon=${`lon`}&exclude=${`exclude`}&appid=${KEY_TWO}`;

// const fns = require('./controller');

app.use(express.json());
app.use(cors());

app.post('/api/weather', (req, res) => {
    ///////// need to make reusability work below///////////
    // const url = 'http://api.openweathermap.org/geo/1.0/zip?zip=80205&appid=abe81164b6408f7f78955541dba4dd84' 
    const params = req.body;
        
    console.log("server side:", params);

    const getLocData = axios.get('http://api.openweathermap.org/geo/1.0/zip?zip=80205&appid=abe81164b6408f7f78955541dba4dd84')
    .then( response => {
        console.log("first response:", response.data);
        const data = response.data;
        const lat = data.lat;
        const lon = data.lon;
        const exclude = `minutely,hourly,daily,alerts`;
        console.log(`coords:`, lat , lon)

    }) 
    axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=39.7392364&lon=-104.984862&exclude=minutely,hourly,daily,alerts&appid=abe81164b6408f7f78955541dba4dd84`)
    .then(weatherRes => {
        console.log("weather response:", weatherRes.data)

        const currentWeather = {
            current: weatherRes.data.current
        }

        console.log('current weather:', currentWeather);
        res.send(currentWeather);
    }
)
    .catch(err => {
    res.status(500).send('Internal Server Error')})
})


app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))