const mongoose = require("mongoose");
const config = require("config");
const database = config.get("database");

const connectDB = async () => {
  try {
    await mongoose.connect(database);
    console.log("database connected...");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
