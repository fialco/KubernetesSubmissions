const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
