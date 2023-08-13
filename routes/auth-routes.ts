import { Router } from "express";
import { auth } from "../controllers";

// // Get a User
// router.get("/user", authController.isAuthenticated, (req, res) => {
//     res.json(req.user);
// });

export const attachRoutes = (router: Router): void => {
    // Set-up Signup Route
    router.post("/auth/signup", auth.signup);

    // Set-up Signin Route
    router.post("/auth/signin", auth.signin);

    // Set-up Logout Route
    router.get("/auth/logout", auth.logout);
};
