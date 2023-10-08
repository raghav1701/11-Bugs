import { Router } from "express";
import { home, auth } from "../controllers";

export const attachRoutes = (router: Router): void => {
    router.post("/home/recommend", home.recommend);

    router.post("/home/recommend/no-auth", home.recommendNoAuth);

    router.post(
        "/home/recommend/auth",
        auth.isAuthenticated,
        home.recommendAuth,
    );

    //Return the leaderboard
    router.post("/home/leaderboard/global", home.globalLeaderboard);

    // Return the leaderboard of friends
    router.post(
        "/home/leaderboard/friends",
        auth.isAuthenticated,
        home.friendsLeaderboard,
    );
};
