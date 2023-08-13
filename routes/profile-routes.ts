import { Router } from "express";
import { auth, profile } from "../controllers";

export const attachRoutes = (router: Router): void => {
    // Update a profile
    router.patch("/", auth.isAuthenticated, profile.updateProfile);

    // Update a profile score
    router.patch("/score", profile.updateProfileScores);

    // Return a user profile
    router.post("/:id", profile.getUserProfile);

    // Upvote a profile
    router.post("/:id/upvote", auth.isAuthenticated, profile.upvoteProfile);

    // Downvote a profile
    router.post("/:id/downvote", auth.isAuthenticated, profile.downvoteProfile);

    // Update a handle
    router.patch("/handle", auth.isAuthenticated, profile.updateHandle);
};
