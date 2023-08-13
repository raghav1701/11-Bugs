import express from "express";
const router = express.Router();
import * as authController from "../controller/authController.js";

// Get a User
router.get("/user", authController.isAuthenticated, (req, res) => {
    res.json(req.user);
});

// Set-up Signup Route
router.post("/signup", authController.signup);

// Set-up Signin Route
router.post("/signin", authController.signin);

// Set-up Logout Route
router.get("/logout", authController.logout);

export default router;
