const { JpegFile, PDFFile, PngFile } = require("../models/File");

const uploadFile = async (req, res) => {
  try {
    const fileExtension = req.file.mimetype;
    const fileData = {
      data: req.file.buffer,
      originalName: req.file.originalname,
      fileExtension: fileExtension,
    };
    let file;

    switch (fileExtension) {
      case "image/jpeg":
        file = await JpegFile.create(fileData);
        break;
      case "image/png":
        file = await PngFile.create(fileData);
        break;
      case "application/pdf":
        file = await PDFFile.create(fileData);
        break;

      default:
        res.status(415).json({
          message:
            "This file extension not allowed. You can only upload 'jpeg', 'png' and 'pdf' file",
        });
        return;
    }

    return res.status(201).json({
      id: file.id,
      name: file.originalName,
      extension: file.fileExtension,
      url: `/file/${file.id}?type=${file.fileExtension}`,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const getFile = async (req, res) => {
  try {
    const type = req.query.type;
    const { id } = req.params;
    let file;

    switch (type) {
      case "image/jpeg":
        file = await JpegFile.findById(id);
        break;
      case "image/png":
        file = await PngFile.findById(id);
        break;
      case "application/pdf":
        file = await PDFFile.findById(id);
        break;

      default:
        res.status(404).json({
          message:
            "The query type is not valid. Type can only be 'image/jpeg', 'image/png' and 'application/pdf' file",
        });
        return;
    }

    const b64 = Buffer.from(file.data, "base64");
    res.setHeader("Content-Type", file.fileExtension);
    res.setHeader("Content-Length", b64.length);
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    res.send(b64);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteFile = async (req, res) => {
  try {
    const type = req.query.type;
    const { id: _id } = req.params;
    let file;

    switch (type) {
      case "image/jpeg":
        file = await JpegFile.findOneAndDelete({ _id });
        break;
      case "image/png":
        file = await PngFile.findOneAndDelete({ _id });
        break;
      case "application/pdf":
        file = await PDFFile.findOneAndDelete({ _id });
        break;

      default:
        res.status(404).json({
          message:
            "The query type is not valid. Type can only be 'image/jpeg', 'image/png' and 'application/pdf' file",
        });
        return;
    }

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(200).json({
      message: `${file.originalName} file with id ${file.id} deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateFile = async (req, res) => {
  try {
    const type = req.query.type;
    const { id: _id } = req.params;
    let file;

    const fileExtension = req.file.mimetype;
    const fileData = {
      data: req.file.buffer,
      originalName: req.file.originalname,
      fileExtension: fileExtension,
    };

    switch (type) {
      case "image/jpeg":
        file = await JpegFile.findByIdAndUpdate(
          _id,
          { ...fileData, _id },
          { new: true }
        );
        break;
      case "image/png":
        file = await PngFile.findByIdAndUpdate(
          _id,
          { ...fileData, _id },
          { new: true }
        );
        break;
      case "application/pdf":
        file = await PDFFile.findByIdAndUpdate(
          _id,
          { ...fileData, _id },
          { new: true }
        );
        break;

      default:
        res.status(404).json({
          message:
            "The query type is not valid. Type can only be 'image/jpeg', 'image/png' and 'application/pdf' file",
        });
        return;
    }

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }

    return res.status(202).json({
      message: `${file.originalName} file with id ${file.id} updated successfully`,
    });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  uploadFile,
  getFile,
  deleteFile,
  updateFile,
};
