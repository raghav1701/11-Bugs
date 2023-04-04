const router = require("express").Router();
const scrappingController = require("../controller/scrappingController");

//scrapping

// github
router.get("/github/:gh_name", scrappingController.gh_scrapping);

// codechef
router.get("/codechef/:cc_name", scrappingController.cc_scrapping);

// codeforces
router.get("/codeforces/:cf_name", scrappingController.cf_scrapping);

module.exports = router;
