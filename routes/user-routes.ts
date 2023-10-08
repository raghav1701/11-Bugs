import { Router } from "express";
import { auth, user } from "../controllers";
import { jwtCheck } from "../middlewares";

export const attachRoutes = (router: Router): void => {
    //todo: get current user

    // Update User
    router.patch("/user", jwtCheck, user.updateUser);

    // Update user score
    router.patch("/user/score", user.updateUserScores);

    // Return user profile
    router.get("/user/:id", user.getUserProfile);

    // Upvote user
    router.get("/user/:id/upvote", jwtCheck, user.upvoteProfile);

    // Downvote user
    router.get("/user/:id/downvote", jwtCheck, user.downvoteProfile);

    // Update a handle
    router.patch("/user/handle", jwtCheck, user.updateHandle);
};
