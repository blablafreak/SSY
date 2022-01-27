const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());
/**
 * Bewertung
 * bid,uid,beschreibung,prozentzahl
 */

const bewertungenByUId = {};

app.get("/unternehmen/:id/bewertungen", (req, res) => {
  res.send(bewertungenByUId[req.params.id] || []);
});

app.post("/unternehmen/:id/bewertungen", async (req, res) => {
  const bid = randomBytes(4).toString("hex");
  const { beschreibung, prozentzahl } = req.body;

  const bewertungen = bewertungenByUId[req.params.id] || [];

  const bewertung = { bid, uid: req.params.id, beschreibung, prozentzahl }
  bewertungen.push(bewertung);

  bewertungenByUId[req.params.id] = bewertungen;

  res.status(201).send(bewertung);
});

app.put("/unternehmen/:uid/bewertungen/:bid", (req, res) => {
  const bid = req.params.bid;
  const { beschreibung, prozentzahl } = req.body;

  const bewertungen = bewertungenByUId[req.params.uid] || [];

  const bewertung = bewertungen.find((bewertung) => {
    return bewertung.bid === bid;
  });

  if(beschreibung) 
    bewertung.beschreibung = beschreibung;
  if(prozentzahl) 
    bewertung.prozentzahl = prozentzahl;

  res.status(201).send(bewertung);
});


app.listen(4001, () => {
  console.log("Listening on 4001");
});
