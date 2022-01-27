const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyparser.json());

const unternehmen = {};

app.get('/unternehmen', (req, res) => {
    res.send(unternehmen);
})

app.post('/unternehmen', (req, res) => {
    const UID = randomBytes(4).toString('hex');
    const { name } = req.body;
    const { adresse } = req.body;
    const { ort } = req.body;

    unternehmen[UID] = { UID, name, adresse, ort, };
    //unternehmen.push(UID, req.body.name, req.body.adresse);
    res.send(unternehmen[UID]);

})


app.put('/unternehmen/:UID', (req, res) => {
    const { UID } = req.params;
    const { adresseNeu } = req.body;
    const { ortNeu } = req.body;

    if ('adresseNeu' in req.body) {
        if ('ortNeu' in req.body) {
            unternehmen[UID].adresse = adresseNeu;
            unternehmen[UID].ort = ortNeu;
            res.send(unternehmen[UID]);
            return;
        }
    }
    if ('ortNeu' in req.body) {
        unternehmen[UID].ort = ortNeu;
        unternehmen[UID].adresse = unternehmen[UID].adresse;
    }
    if ('adresseNeu' in req.body) {
        unternehmen[UID].adresse = adresseNeu;
        unternehmen[UID].ort = unternehmen[UID].name;
    }

    res.send(unternehmen[UID]);
})


let port = 3000;
console.log('Port opens on ' + port);
app.listen(port);