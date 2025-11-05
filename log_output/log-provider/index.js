const express = require("express");
const fs = require("node:fs");

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  fs.readFile("files/log.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    response.send(data);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
