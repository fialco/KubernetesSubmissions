const express = require("express");
const fs = require("node:fs");

const app = express();
app.use(express.json());

const pongsPath = "./files/pongs.txt";

const getPongCount = () => {
  if (fs.existsSync(pongsPath)) {
    const data = fs.readFileSync(pongsPath, "utf8");
    return parseInt(data);
  }
  return 0;
};

app.get("/pingpong", (req, response) => {
  let pongs = getPongCount();
  pongs++;

  fs.writeFileSync(pongsPath, pongs.toString());

  response.send(`<p>pong ${pongs}</p>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
