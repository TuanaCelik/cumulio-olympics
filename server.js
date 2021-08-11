require("dotenv").config();
const express = require("express");
const Cumulio = require("cumulio");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "public")));

app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.listen(3000, () => console.log("Application running on port 3000"));
