import { Router } from "express";
import { auth, friends } from "../controllers";
import { jwtCheck } from "../middlewares";

export const attachRoutes = (router: Router): void => {
    // Get all friends
    router.get("/friends/all", jwtCheck, friends.getAllFriends);

    // Create friend request
    router.post("/friends/request", jwtCheck, friends.createFriendRequest);

    // Get requests received
    router.get("/friends/request", jwtCheck, friends.getFriendRequest);

    // Get requests sent
    router.get("/friends/sent", jwtCheck, friends.getRequestSent);

    // Remove friend
    router.post("/friends/remove", jwtCheck, friends.removeFriend);

    // Accept Request
    router.post("/friends/accept", jwtCheck, friends.acceptRequest);

    // Decline Request
    router.post("/friends/decline", jwtCheck, friends.declineRequest);
};
