import express from "express";
const router = express.Router();
import * as errorHandler from "../handler/error.js";
import User from "../models/User.js";

router.post("/", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return errorHandler.handleBadRequest(res);
        const user = await User.findOne({ username: query }).select(
            "name email username karma avatar",
        );
        res.status(200).json({ user });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

export default router;
