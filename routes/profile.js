const router = require("express").Router();
const authController = require("../controller/authController");
const User = require("../models/User");
const errorHander = require("../handler/error");

// Update a profile
router.patch("/", authController.isAuthenticated, async (req, res) => {
  try {
    const update = await User.findByIdAndUpdate(req.user._id, {
      name: req.body.name || req.user.name,
      email: req.body.email || req.user.email,
      resume: req.body.resume || req.user.resume,
    });
    console.log(update);
    res.status(200).json({ message: "Updated!" });
  } catch (error) {
    console.log(error);
    errorHander.handleInternalServer(res);
  }
});

// Return a user profile
router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .select("-password")
      .populate("friends", "name avatar");
    if (!user) return errorHander.handleNotFound(res, "User Not Found");
    res.status(200).json({ user });
  } catch (error) {
    errorHander.handleInternalServer(res);
  }
});

// Upvote a profile
router.post("/:id/upvote", authController.isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;
    if (req.user._id.equals(id)) return errorHander.handleBadRequest(res);

    const user = await User.findById(id);
    if (!user) return errorHander.handleNotFound(res, "User Not Found!");
    await User.findByIdAndUpdate(id, {
      $pull: { review: { user: req.user._id } },
    });
    const update = await User.findByIdAndUpdate(id, {
      $push: { review: { user: req.user._id, value: 1 } },
    });
    res.status(200).json({ message: "Upvoted!" });
  } catch (error) {
    errorHander.handleInternalServer(res);
  }
});

// Downvote a profile
router.post(
  "/:id/downvote",
  authController.isAuthenticated,
  async (req, res) => {
    try {
      const id = req.params.id;
      if (req.user._id.equals(id)) return errorHander.handleBadRequest(res);

      const user = await User.findById(id);
      if (!user) return errorHander.handleNotFound(res, "User Not Found!");
      await User.findByIdAndUpdate(id, {
        $pull: { review: { user: req.user._id } },
      });
      const update = await User.findByIdAndUpdate(id, {
        $push: { review: { user: req.user._id, value: -1 } },
      });
      res.status(200).json({ message: "Downvoted!" });
    } catch (error) {
      errorHander.handleInternalServer(res);
    }
  }
);

// Update a handle
router.patch("/handle", authController.isAuthenticated, async (req, res) => {
  try {
    if (!req.body.code) return errorHander.handleBadRequest(res);
    const field = {};
    field["handles." + req.body.code.toLowerCase()] = req.body.handle;
    console.log(field);
    const update = await User.findByIdAndUpdate(req.user._id, field);
    console.log(update);
    res.status(200).json({ message: "Updated!" });
  } catch (error) {
    console.log(error);
    errorHander.handleInternalServer(res);
  }
});

module.exports = router;
