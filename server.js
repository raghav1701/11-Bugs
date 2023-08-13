import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { fileURLToPath } from "url";

// Routers
import home from "./routes/home.js";
import auth from "./routes/auth.js";
import profile from "./routes/profile.js";
import scrap from "./routes/scrap.js";
import search from "./routes/search.js";
import friends from "./routes/friends.js";

// App
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Routes
app.use("/", home);
app.use("/profile", profile);
app.use("/auth", auth);
app.use("/search", search);
app.use("/scrap", scrap);
app.use("/friends", friends);

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
