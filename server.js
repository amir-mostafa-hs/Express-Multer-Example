require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const connectDB = require("./database/connection");

const app = express();
const upload = multer({});

// set middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single("file"));

// base API route
const accessError = (req, res) => {
  res.status(401).json({
    message: "Access denied",
  });
  return;
};
app.route("/").all(accessError);
app.use("/file", require("./routes/file.routes"));

(async function () {
  try {
    const PORT = process.env.PORT || 3000;
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log("The server running on port:", PORT);
    });
  } catch (error) {
    console.log(error);
    // make the process fail
    process.exit(1);
  }
})();
