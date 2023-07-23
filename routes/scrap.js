const router = require("express").Router();
const scrappingController = require("../controller/scrappingController");

//scrapping

// github
router.post("/github/:gh_name", scrappingController.gh_scrapping);

// codechef
router.post("/codechef/:cc_name", scrappingController.cc_scrapping);

// codeforces
router.post("/codeforces/:cf_name", scrappingController.cf_scrapping);

module.exports = router;
