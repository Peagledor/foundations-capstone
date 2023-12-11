require('dotenv').config();
const SERVER_PORT = 4004;
const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');

const KEY = 'abe81164b6408f7f78955541dba4dd84';

// const fns = require('./controller');

app.use(express.json());
app.use(cors());

app.post('/api/weather', (req, res) => {
    const {cityName} = req.body;
    console.log(cityName)

    axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${KEY}`)
        .then(res => {
            const data = res.data
            return data
        }).send(data);
})

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));