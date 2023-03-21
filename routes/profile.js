const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("Profile");
});

module.exports = router;
