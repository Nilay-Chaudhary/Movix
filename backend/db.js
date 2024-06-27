const mongoose = require('mongoose');

const MONGO_URI = "mongodb://127.0.0.1:27017/Movix";

const connectTo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectTo;
