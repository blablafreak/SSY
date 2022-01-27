const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

/***
 * Unternehmen
 * UID;Name;Adresse
 */
const unternehmen = {};

app.get("/unternehmen", (req, res) => {
  res.send(unternehmen);
});

app.post("/unternehmen", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const {name, adresse} = req.body;

  unternehmen[id] = {
    id,
    name,
    adresse,
  };

  res.status(201).send(unternehmen[id]);
});

app.put("/unternehmen/:id", async (req, res) => {
  const id = req.params.id
  const {adresse} = req.body;

  if(unternehmen[id] == null)
    res.status(400).end();
  else {
    unternehmen[id].adresse =  adresse;
    res.status(201).send(unternehmen[id]);
  }
});


app.listen(4002, () => {
  console.log("Listening on 4001");
});
