const crypto = require("crypto");
const express = require("express");

const app = express();
app.use(express.json());

const string = crypto.randomUUID();

const getStringNow = () => {
  const dateLog = new Date();
  console.log(dateLog.toISOString(), string);
};

const logger = setInterval(getStringNow, 5000);

app.get("/", (request, response) => {
  const date = new Date();

  response.send(`<p>${date.toISOString()} ${string}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
