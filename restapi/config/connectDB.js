const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.db);
    console.log("database connected...");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDB;
