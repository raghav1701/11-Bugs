const router = require("express").Router();
const authController = require("../controller/authController");
const User = require("../models/User");
const errorHandler = require("../handler/error");
const { default: mongoose } = require("mongoose");

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

// Add friend
router.post("/add", authController.isAuthenticated, async (req, res) => {
  try {
    if (req.body.email === req.user.email)
      return errorHandler.handleBadRequest(res);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return errorHandler.handleBadRequest(res, "User not found!");

    const already = user.friends.find((u) => u.equals(req.user._id));
    if (already) return errorHandler.handleBadRequest(res, "Already a friend!");

    // Update the logged in user
    await User.findByIdAndUpdate(req.user._id, {
      $push: { friends: user._id },
    });

    // Update the friend
    await User.findByIdAndUpdate(user._id, {
      $push: { friends: req.user._id },
    });

    res.status(200).json({ message: "Added friend!" });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
});

// Remove friend
router.post("/remove", authController.isAuthenticated, async (req, res) => {
  try {
    if (req.body.email === req.user.email)
      return errorHandler.handleBadRequest(res);

    const user = await User.findOne({ email: req.body.email });
    if (!user) return errorHandler.handleBadRequest(res, "User not found!");

    const already = user.friends.find((u) => u.equals(req.user._id));
    if (!already) return errorHandler.handleBadRequest(res, "Not a friend!");

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

module.exports = router;
