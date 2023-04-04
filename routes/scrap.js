const router = require("express").Router();
const scrappingController = require("../controller/scrappingController");

//scrapping

// codechef 
router.get("/cc/:cc_name", scrappingController.cc_scrapping);

// codeforces 
router.get("/cf/:cf_name", scrappingController.cf_scrapping);

module.exports = router