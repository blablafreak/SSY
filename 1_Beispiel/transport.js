const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');


const app = express();
app.use(bodyparser.json());

const getbypackageID = {};


app.get('/transport/:id', async (req, res) => {

    res.send(getbypackageID[req.params.id] || []);

})

let port = 4001;
console.log('Started listening on ' + port);
app.listen(port);