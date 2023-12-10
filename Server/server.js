require('dotenv').config();
const SERVER_PORT = 4004;
const express = require('express');
const app = express();
const cors = require('cors');

const {KEY} = process.env;

// const fns = require('./controller');

app.use(express.json());
app.use(cors());

app.post('/api/weather', (req, res) => {
    const {cityName} = req.body;

    app.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${KEY}`).status(200).send(res.data);
})

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));