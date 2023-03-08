require("dotenv").config()
const mongoose = require("mongoose");

// Connection
mongoose.connection.on(
  "error",
  console.error.bind(console, "Connection Error:")
);
mongoose.connection.on("open", () => {
  console.log("Connected to DB!");
});
const db = mongoose.connect(process.env.MONGO_URI);
module.exports = db;
