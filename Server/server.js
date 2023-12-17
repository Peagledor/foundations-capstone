const SERVER_PORT = 4004;
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

// const fns = require('./controller');

app.use(express.json());
app.use(cors());

app.post('/api/weather', (req, res) => {
 
    const params = req.body;
    const zip = params.zipCode;
    console.log("server side:", params);
    
    const key = 'abe81164b6408f7f78955541dba4dd84'
    const exclude = `minutely,hourly,daily,alerts`;
    const zipURL = `http://api.openweathermap.org/geo/1.0/zip?zip=${zip}&appid=${key}`
    

    axios.get(zipURL)
    .then( response => {
        console.log("first response:", response.data);
        const data = response.data;
        const lat = data.lat;
        const lon = data.lon;
        console.log(`coords:`, lat , lon)
        
        const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${key}&units=imperial`;
        console.log(`URL:`, weatherURL)

        return axios.get(weatherURL)
        .then(weatherRes => {
            console.log("weather response:", weatherRes.data)
    
            const currentWeather = {
                current: weatherRes.data//.current
            }
        
            console.log('current weather:', currentWeather);
            res.send(currentWeather);
        })
    }) 
    .catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error')
    }
)})


app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))