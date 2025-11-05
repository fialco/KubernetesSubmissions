const crypto = require("crypto");
const express = require("express");
const fs = require("node:fs");

const app = express();
app.use(express.json());

const string = crypto.randomUUID();

const logString = () => {
  const dateLog = new Date();

  const log = `${dateLog.toISOString()} ${string}\n`;

  fs.appendFile("files/log.txt", log, (err) => {
    if (err) {
      console.log(err);
    } else {
      // Success
    }
  });
};

const logger = setInterval(logString, 5000);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
