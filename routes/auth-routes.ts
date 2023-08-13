import { Router } from "express";
import { auth } from "../controllers";

// // Get a User
// router.get("/user", authController.isAuthenticated, (req, res) => {
//     res.json(req.user);
// });

export const attachRoutes = (router: Router): void => {
    // Get a User
    router.get("/user", auth.isAuthenticated);

    // Set-up Signup Route
    router.post("/signup", auth.signup);

    // Set-up Signin Route
    router.post("/signin", auth.signin);

    // Set-up Logout Route
    router.get("/logout", auth.logout);
};
