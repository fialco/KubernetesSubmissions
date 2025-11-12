const express = require("express");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use("/files", express.static(path.join(__dirname, "files")));

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "image.jpg");

const fileAlreadyExists = async () =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

const removeFile = async () =>
  new Promise((res) => fs.unlink(filePath, (err) => res()));

const downloadLatestImage = async () => {
  // if (await fileAlreadyExists()) return true;

  await new Promise((res) => fs.mkdir(directory, (err) => res()));
  const response = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  });
  response.data.pipe(fs.createWriteStream(filePath));
  return true;
};

// At start check if there is an image already
if (!fileAlreadyExists()) {
  downloadLatestImage();
}

setInterval(downloadLatestImage, 10 * 60 * 1000);

app.get("/api/refresh", async (req, res) => {
  downloadLatestImage();
});

app.get("/api/image", async (req, res) => {
  await fileAlreadyExists();
  res.json({ path: "./files/image.jpg" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started in port ${PORT}`);
});
