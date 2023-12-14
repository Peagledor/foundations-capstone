// require('dotenv').config();
const SERVER_PORT = 4004;
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');


const KEY = '662a129c5b90d8e37ab11bad63eab67f';
const url = `http://api.openweathermap.org/geo/1.0/direct?q=${`city`}, ${`state`}&limit=5&appid=${KEY}`

// const fns = require('./controller');

app.use(express.json());
app.use(cors());


app.post('/api/weather', (req, res) => {
    const {city} = req.body
    console.log(city)
    axios.get(url, res) // get from api
    .then(response => { // do this with response
            console.log(response.data)
            res.send(response.data); // sent to response data to client
        })
        .catch(err => {
            res.status(500).send('Internal Server Error') // oops
        })

})

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));