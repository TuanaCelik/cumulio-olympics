require("dotenv").config();
const express = require("express");
const Cumulio = require("cumulio");
const { join } = require("path");

const app = express();

const client = new Cumulio({
  api_key: process.env.CUMULIO_API_KEY,
  api_token: process.env.CUMULIO_API_TOKEN,
});

app.get("/authorization", (req, res) => {
  client
    .create("authorization", {
      type: "temporary",
      expiry: "1 day",
      inactivity_interval: "30 minutes",
    })
    .then((result) => {
      return res.status(200).json(result);
    });
});

app.use(express.static(join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Application running on port 3000"));
