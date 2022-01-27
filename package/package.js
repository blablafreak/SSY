const express = require('express');
const bodyparser = require('body-parser');
const axios = require('axios');
const { randomBytes } = require('crypto');

const app = express();
app.use(bodyparser.json());

var num = 1;
const packages = {};

app.get('/packages', (req, res) => {
    res.send(packages);
}
)

app.post('/packages', async (req, res) => {
    const packageID = randomBytes(5).toString('hex');
    //const { num } = req.body; -- Wenn der Numerator getestet werden soll
        if (num <= 1000) {
            const { paketname } = req.body;

            packages[packageID] = { ID: packageID, paketname };

            /* await axios.post('http://localhost:4010/events', {
                 type: "PackageReceived",
                 data: {
                     num,
                     paketname,
                 },
             });*/

            res.status(200).send('Paket angenommen');

        } else {
            res.status(417).send('Kein Platz im Lager');
        }
  
    num++;
}) 

app.delete('/package/:id', (req, res) => {
    const { id } = req.params;

    res.send(packages[id] || []);
    delete packages[id];
    num--;
}) 

let port = 4000;
console.log('Server will be opened on port ' + port);
app.listen(port);
