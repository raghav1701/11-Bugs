import { Router } from "express";
import { auth, friends } from "../controllers";

export const attachRoutes = (router: Router): void => {
    // Get all friends
    router.get("/friends/all", auth.isAuthenticated, friends.getAllFriends);

    // Create friend request
    router.post(
        "/friends/request",
        auth.isAuthenticated,
        friends.createFriendRequest,
    );

    // Get requests received
    router.get(
        "/friends/request",
        auth.isAuthenticated,
        friends.getFriendRequest,
    );

    // Get requests sent
    router.get("/friends/sent", auth.isAuthenticated, friends.getRequestSent);

    // Remove friend
    router.post("/friends/remove", auth.isAuthenticated, friends.removeFriend);

    // Accept Request
    router.post("/friends/accept", auth.isAuthenticated, friends.acceptRequest);

    // Decline Request
    router.post(
        "/friends/decline",
        auth.isAuthenticated,
        friends.declineRequest,
    );
};
