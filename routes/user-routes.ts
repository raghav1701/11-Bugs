import { Router } from "express";
import { auth, user } from "../controllers";

export const attachRoutes = (router: Router): void => {
    //todo: get current user

    // Update User
    router.patch("/user", auth.isAuthenticated, user.updateUser);

    // Update user score
    router.patch("/user/score", user.updateUserScores);

    // Return user profile
    router.post("/user/:id", user.getUserProfile);

    // Upvote user
    router.post("/user/:id/upvote", auth.isAuthenticated, user.upvoteProfile);

    // Downvote user
    router.post(
        "/user/:id/downvote",
        auth.isAuthenticated,
        user.downvoteProfile,
    );

    // Update a handle
    router.patch("/user/handle", auth.isAuthenticated, user.updateHandle);
};
