import express from "express";
const router = express.Router();
import * as scrappingController from "../controller/scrappingController.js";

router.post("/github/:gh_name", scrappingController.gh_scrapping);

router.post("/codechef/:cc_name", scrappingController.cc_scrapping);

router.post("/codeforces/:cf_name", scrappingController.cf_scrapping);

export default router;
