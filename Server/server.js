require('dotenv').config();
const SERVER_PORT = 4004;
const express = require('express');
const app = express();
const cors = require('cors');

// const fns = require('./controller');


app.use(express.json());
app.use(cors());

app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));