// require('dotenv').config();
const SERVER_PORT = 4004;
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const path = require('path');


const KEY = '662a129c5b90d8e37ab11bad63eab67f';
const KEY_TWO = 'abe81164b6408f7f78955541dba4dd84'
// const url = `http://api.openweathermap.org/geo/1.0/direct?q=${params.city}, ${params.state}&limit=5&appid=${KEY}`;
// const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${`lat`}&lon=${`lon`}&exclude=${`exclude`}&appid=${KEY_TWO}`;

// const fns = require('./controller');

app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'public')));
app.use(cors());

app.post('/api/weather', (req, res) => {
    const params = req.body;
        
    console.log("server side:", params.city, params.state);

    axios.get(url, {
        params: {
            city: params.city,
            state: params.state
        }
    }
    )
    .then( response => {
        const lat = response.data.lat;
        const lon = response.data.lon;
        const exclude = `minutely,hourly,daily,alerts`;
        
        axios.get(weatherURL, {
            params: {
                lat,
                lon,
                exclude,
                KEY
            }
        })
        .then(weatherResponse => {
                console.log("second axios request:", params)

                console.log(weatherResponse);
                
                const currentWeather = weatherResponse.data;
                
                console.log(currentWeather);
                res.send(currentWeather);
            }) 
        .catch(err => {
        res.status(500).send('Internal Server Error')})
})})

// const lat = response.lat
// const lon = response.lon
// const exclude = `minutely, hourly, daily, alerts`
// axios.get(weatherURL, res)
// .then(res => {
//     const currentWeather = res.data
//     console.log(currentWeather)
//     res.send(currentWeather)
// })


// app.post('/api/weather', (req, res) => {
//     const params = req.body;
        
//     console.log("server side:", params.city, params.state);

//     axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${params.city}, ${params.state}&limit=5&appid=${KEY}`, {
//         params: {
//             city: params.city,
//             state: params.state
//         }
//     })
//     .then(response => {

//         console.log("first response:", response);

//         if(response.dara.lat && response.data.lon) {
//             const lat = response.data[0].lat;
//             const lon = response.data[0].lon;
//             const exclude = `minutely,hourly,daily,alerts`;

        
//         axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${exclude}&appid=${KEY_TWO}`, {
//             // params: {
//             //     lat: params.lat,
//             //     lon: params.lon,
//             //     exclude,
//             //     KEY
//             // }
//         })
//         // console.log(params)
//         .then(weatherResponse => {
//             console.log("second API response:", weatherResponse);
                        
//             const currentWeather = weatherResponse.data.value;
//             console.log("current weather", currentWeather);
//             res.send(currentWeather);
//         })
//         .catch(err => {
//             console.error("Error in second Axios request:", err);
//             res.status(500).send('Internal Server Error');
//         })
//         } else {
//             res.status(500).send('Internal Server Error')
//     }})
//     .catch(err => {
//         // console.error("Error in first Axios request:", err);
//         res.status(500).send('Internal Server Error');
//     });
// });

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`))