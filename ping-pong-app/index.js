const express = require("express");

const app = express();
app.use(express.json());

let pongs = 0;

app.get("/pingpong", (request, response) => {
  const pongsNow = pongs++;
  response.send(`<p>pong ${pongsNow}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
