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
    router.post("/user/:id", user.getUserProfile);

    // Upvote user
    router.post("/user/:id/upvote", jwtCheck, user.upvoteProfile);

    // Downvote user
    router.post("/user/:id/downvote", jwtCheck, user.downvoteProfile);

    // Update a handle
    router.patch("/user/handle", jwtCheck, user.updateHandle);
};
