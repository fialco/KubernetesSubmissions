const express = require("express");
const axios = require("axios");
const fs = require("node:fs");

const app = express();
app.use(express.json());

app.get("/", async (request, response) => {
  const logs = fs.readFileSync("files/log.txt", "utf8");
  const pongs = await axios.get("http://ping-pong-svc:2345/pings");

  const lines = logs.split("\n");
  const last = lines[lines.length - 2];

  const page = `<div><p>${last}</p><p>Ping / Pongs: ${pongs.data}</p></div>`;
  response.send(page);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
