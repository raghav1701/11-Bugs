import * as auth from "./auth-routes";
import * as friend from "./friends-routes";
import * as home from "./home-routes";
import * as user from "./user-routes";
import * as scrapping from "./scrapping-routes";
import * as search from "./search-routes";
import bodyParser from "body-parser";
import { Router } from "express";

export const attachRoutes = (app: any): void => {
    const router = Router();
    app.use("/api/v1", router);
    router.use(bodyParser.json());

    auth.attachRoutes(router);
    friend.attachRoutes(router);
    home.attachRoutes(router);
    user.attachRoutes(router);
    scrapping.attachRoutes(router);
    search.attachRoutes(router);
};
