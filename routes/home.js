const router = require("express").Router();

router.get("/", (req, res) => {
  console.log("Home");
});

module.exports = router;
