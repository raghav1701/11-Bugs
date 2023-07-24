const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

// Routers
const home = require("./routes/home");
const auth = require("./routes/auth");
const profile = require("./routes/profile");
const scrap = require("./routes/scrap");
const search = require("./routes/search");
const friends = require("./routes/friends");

// App
const app = express();
dotenv.config();

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/public", express.static(path.resolve(__dirname, "./public")));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Routes
app.use("/", home);
app.use("/profile", profile);
app.use("/auth", auth);
app.use("/search", search);
app.use("/scrap", scrap);

app.use("/friends", friends);
if (process.env.NODE_ENV === "production") {
    // Basename is client should be '/app'
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

// Connection
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "SaaS",
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
