const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyparser.json());

const unternehmen = {};

app.get('/unternehmen', (req, res) => {
    res.send(unternehmen);
})

app.post('/unternehmen', (req, res) => {

})
