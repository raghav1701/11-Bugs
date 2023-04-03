require("dotenv").config();
const express = require("express");
const db = require("./config/db_config");
const path = require("path");
const cookieParser = require("cookie-parser");

// Routers
const home = require("./routes/home");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const scrap = require("./routes/scrap");
const friends = require("./routes/friends");

// PORT
const PORT = process.env.PORT || 5000;

// App
const app = express();

//MiddleWares
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Routes
app.use("/", home);
app.use("/profile", profile);
app.use("/auth", auth);

app.use("/scrap", scrap);

app.use("/friends", friends);
if (process.env.NODE_ENV === "production") {
  // Basename is client should be '/app'
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listen
app.listen(PORT, () => {
  console.log("Server is up and running!");
});
