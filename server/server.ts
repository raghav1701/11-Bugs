import dotenv from "dotenv";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import * as routes from "../routes";

// App
const app = express();
dotenv.config();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
routes.attachRoutes(app);

// Connection
const PORT = process.env.PORT || 6001;
mongoose
    .connect(process.env.MONGO_URL, {
        dbName: "11-Bugs",
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));
