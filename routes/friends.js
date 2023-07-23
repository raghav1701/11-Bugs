const router = require("express").Router();
const authController = require("../controller/authController");
const User = require("../models/User");
const errorHandler = require("../handler/error");

// Get all friends
router.get("/", authController.isAuthenticated, async (req, res) => {
    try {
        const friends = await Promise.all(
            req.user.friends.map((id) => User.findById(id).select("-password"))
        );
        res.status(200).json({ friends });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Create friend request
router.post("/request", authController.isAuthenticated, async (req, res) => {
    try {
        if (req.body.userID === req.user._id)
            return errorHandler.handleBadRequest(res);

        const user = await User.findById(req.body.userID);
        if (!user) return errorHandler.handleBadRequest(res, "User not found!");

        const already = user.friends.find((u) => u.equals(req.user._id));
        if (already)
            return errorHandler.handleBadRequest(res, "Already a friend!");

        // Already requested by other
        if (req.user.sent) {
            const sent = req.user.sent.find((r) => r.equals(user._id));
            if (sent) return errorHandler.handleBadRequest(res);
        }
        if (user.sent) {
            const sent = user.sent.find((r) => r.equals(req.user._id));
            if (sent) return errorHandler.handleBadRequest(res);
        }

        // Update the logged in user
        await User.findByIdAndUpdate(user._id, {
            $push: { received: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
            $push: { sent: user._id },
        });

        res.status(200).json({ message: "Requested!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Get requests received
router.get("/request", authController.isAuthenticated, async (req, res) => {
    try {
        res.status(200).json({ received: req.user.received || [] });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Get requests sent
router.get("/sent", authController.isAuthenticated, async (req, res) => {
    try {
        res.status(200).json({ sent: req.user.sent || [] });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Remove friend
router.post("/remove", authController.isAuthenticated, async (req, res) => {
    try {
        if (req.body.user === req.user._id)
            return errorHandler.handleBadRequest(res);

        const user = await User.findById(req.body.user);
        if (!user) return errorHandler.handleBadRequest(res, "User not found!");

        const already = user.friends.find((u) => u.equals(req.user._id));
        if (!already)
            return errorHandler.handleBadRequest(res, "Not a friend!");

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { friends: user._id },
        });

        // Update the friend
        await User.findByIdAndUpdate(user._id, {
            $pull: { friends: req.user._id },
        });

        res.status(200).json({ message: "Removed friend!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Accept Request
router.post("/accept", authController.isAuthenticated, async (req, res) => {
    try {
        const userID = req.body.user;
        if (!userID) return errorHandler.handleBadRequest(res);

        const user = await User.findById(userID);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");

        const received = req.user.received.find((r) => r.equals(userID));
        if (!received) return errorHandler.handleBadRequest(res);

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { received: user._id },
            $push: { friends: user._id },
        });

        // Update the friend
        await User.findByIdAndUpdate(user._id, {
            $pull: { sent: req.user._id },
            $push: { friends: req.user._id },
        });

        res.status(200).json({ message: "Accepted request!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

// Decline Request
router.post("/decline", authController.isAuthenticated, async (req, res) => {
    try {
        const userID = req.body.user;
        if (!userID) return errorHandler.handleBadRequest(res);

        const user = await User.findById(userID);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");

        if (req.user.received) {
            const request = req.user.received.find((r) => r.equals(userID));
            if (!request) return errorHandler.handleBadRequest(res);
        }

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { received: user._id },
        });
        await User.findByIdAndUpdate(userID, {
            $pull: { sent: req.user._id },
        });

        res.status(200).json({ message: "Declined request!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
});

module.exports = router;
