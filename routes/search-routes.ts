import { Router } from "express";
import { search } from "../controllers";

export const attachRoutes = (router: Router): void => {
    router.post("/search", search.searchUser);
};
