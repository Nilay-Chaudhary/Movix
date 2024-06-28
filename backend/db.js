const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const connectTo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

module.exports = connectTo;
