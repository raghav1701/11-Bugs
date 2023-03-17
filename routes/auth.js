const router = require("express").Router();
const authController = require("../controller/authController");

// Get a User
router.get("/user", authController.isAuthenticated, (req, res) => {
  res.json(req.user);
});

//Set-up Signup Route
router.post("/signup", authController.signup);

//Set-up Signin Route
router.post("/signin", authController.signin);

//Set-up Logout Route
router.post("/logout", authController.logout);

module.exports = router;
