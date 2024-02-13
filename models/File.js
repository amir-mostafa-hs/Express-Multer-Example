const mongoose = require("mongoose");

const JpegFile = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  fileExtension: {
    type: String,
    default: "image/jpeg",
  },
});

const PngFile = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  fileExtension: {
    type: String,
    default: "image/png",
  },
});

const PDFFile = new mongoose.Schema({
  originalName: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
  fileExtension: {
    type: String,
    default: "application/pdf",
  },
});

module.exports = {
  JpegFile: mongoose.model("JpegFile", JpegFile),
  PngFile: mongoose.model("PngFile", PngFile),
  PDFFile: mongoose.model("PDFFile", PDFFile),
};
