import { Router } from "express";
import { home, auth } from "../controllers";

export const attachRoutes = (router: Router): void => {
    router.post("/recommend", home.recommend);

    router.post("/recommend/no-auth", home.recommendNoAuth);

    router.post("/recommend/auth", auth.isAuthenticated, home.recommendAuth);

    //Return the leaderboard
    router.post("/leaderboard/global", home.globalLeaderboard);

    // Return the leaderboard of friends
    router.post(
        "/leaderboard/friends",
        auth.isAuthenticated,
        home.friendsLeaderboard,
    );
};
