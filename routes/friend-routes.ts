import { Router } from "express";
import { auth, friends } from "../controllers";

export const attachRoutes = (router: Router): void => {
    // Get all friends
    router.get("/", auth.isAuthenticated, friends.getAllFriends);

    // Create friend request
    router.post("/request", auth.isAuthenticated, friends.createFriendRequest);

    // Get requests received
    router.get("/request", auth.isAuthenticated, friends.getFriendRequest);

    // Get requests sent
    router.get("/sent", auth.isAuthenticated, friends.getRequestSent);

    // Remove friend
    router.post("/remove", auth.isAuthenticated, friends.removeFriend);

    // Accept Request
    router.post("/accept", auth.isAuthenticated, friends.acceptRequest);

    // Decline Request
    router.post("/decline", auth.isAuthenticated, friends.declineRequest);
};
