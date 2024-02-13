const mongoose = require("mongoose");

const File = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("File", File);
