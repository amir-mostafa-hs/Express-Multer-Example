const mongoose = require("mongoose");

/**
 *
 * @param {string} uri Must be a mongodb connection URI
 */
const connectDB = async (uri) => {
  try {
    mongoose.set("strictQuery", false);
    return await mongoose.connect(uri);
  } catch (err) {
    console.error(err.message);
    // make the process fail
    process.exit(1);
  }
};

module.exports = connectDB;
