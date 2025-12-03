const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
//app.use(express.static("dist"));
app.use("/files", express.static(path.join(__dirname, "files")));

const prodPath = path.join("/", "usr", "src", "app", "files");
const devPath = path.join(__dirname, "files");

const filePath = path.join(prodPath, "image.jpg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return false;
      return true;
    });
  });

const downloadLatestImage = async () => {
  await new Promise((res) => fs.mkdir(prodPath, (err) => res()));
  const response = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(filePath));
  return true;
};

setInterval(downloadLatestImage, 10 * 60 * 1000);

let todos = [
  { id: 1, text: "Learn JavaScript" },
  { id: 2, text: "Learn React" },
  { id: 3, text: "Build a project" },
];

app.get("/api/refresh", async (req, res) => {
  downloadLatestImage();
});

app.get("/api/image", async (req, res) => {
  if (!fileAlreadyExists()) {
    downloadLatestImage();
  }

  const img = fs.readFileSync(filePath);
  res.set("Content-Type", "image/jpg");
  res.send(img);
});

app.get("/api/todos", async (req, res) => {
  res.json(todos);
});

app.post("/api/todos", (req, res) => {
  const { todo } = req.body;

  const newTodo = {
    id: Date.now(),
    text: todo,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
