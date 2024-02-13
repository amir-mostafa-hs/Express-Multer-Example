require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("./models/File");

const port = process.env.PORT || 3000;
const app = express();
const upload = multer({});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(process.env.MONGODB_URI);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    data: req.file.buffer,
    originalName: req.file.originalname,
  };

  const file = await File.create(fileData);
  res.json({
    id: file.id,
    name: file.originalName,
  });
});

app.get("/file/:id", async (req, res) => {
  const file = await File.findById(req.params.id);

  const b64 = Buffer.from(file.data, "base64");

  res.setHeader("Content-Type", "image/jpg");
  res.setHeader("Content-Length", b64.length);
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.send(b64);
});

app.listen(port, () => {
  console.log("server run on port:", port);
});
