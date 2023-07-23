const router = require("express").Router();
const authController = require("../controller/authController");
const errorHandler = require("../handler/error");
const User = require("../models/User");

router.post("/", async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return errorHandler.handleBadRequest(res);
        const user = await User.findOne({ username: query }).select(
            "name email username karma avatar"
        );
        res.status(200).json({ user });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

module.exports = router;
