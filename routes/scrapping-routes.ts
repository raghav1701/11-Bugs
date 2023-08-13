import { Router } from "express";
import { scrapping } from "../controllers";

export const attachRoutes = (router: Router): void => {
    router.post("/scrapping/github/:gh_name", scrapping.gh_scrapping);

    router.post("/scrapping/codechef/:cc_name", scrapping.cc_scrapping);

    router.post("/scrapping/codeforces/:cf_name", scrapping.cf_scrapping);
};
