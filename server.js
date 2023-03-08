require("dotenv").config();
const express = require("express");
const db = require("./config/db_config");
const cookieParser = require("cookie-parser");

// Routers
const home = require("./routes/home");
const auth = require("./routes/auth");
const profile = require("./routes/profile");

// PORT
const PORT = process.env.PORT || 5000;

// App
const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/", home);
app.use("/profile", profile);
app.use("/auth", auth);

// Listen
app.listen(PORT, () => {
  console.log("Server is up and running!");
});
