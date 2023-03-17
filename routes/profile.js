const router = require("express").Router();
const authController = require("../controller/authController");
const User = require("../models/User");
const errorHander = require("../handler/error");

router.get("/", authController.isAuthenticated, (req, res) => {
  try {
  } catch (error) {
    errorHander.handleInternalServer(res);
  }
});

// Upvote a profile
router.post(
  "/:username/upvote",
  authController.isAuthenticated,
  async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username: username });
      if (!user) return errorHander.handleNotFound(res, "User Not Found!");
      const update = await User.findOneAndUpdate(
        { username: username },
        { $push: { review: { user: req.user._id, value: 1 } } }
      );
      res.status(200).json({ message: "Upvoted!" });
    } catch (error) {
      errorHander.handleInternalServer(res);
    }
  }
);

// Downvote a profile
router.post(
  "/:username/downvote",
  authController.isAuthenticated,
  async (req, res) => {
    try {
      const username = req.params.username;
      const user = await User.findOne({ username: username });
      if (!user) return errorHander.handleNotFound(res, "User Not Found!");
      const update = await User.findOneAndUpdate(
        { username: username },
        { $push: { review: { user: req.user._id, value: -1 } } }
      );
      res.status(200).json({ message: "Downvoted!" });
    } catch (error) {
      errorHander.handleInternalServer(res);
    }
  }
);

module.exports = router;
