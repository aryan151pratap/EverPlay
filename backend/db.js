const mongoose = require("mongoose");
require('dotenv').config();

const url = process.env.MONGO_URI;
console.log("MONGO_URI:", process.env.MONGO_URI);
const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
