const router = require("express").Router();
const authController = require("../controller/authController");
const errorHandler = require("../handler/error");
const User = require("../models/User");

router.get("/recommend/no-auth", async (req, res) => {
  try {
    const page = Math.max(0, req.query.page || 0);
    const docsPerPage = 1;

    // Sort the users by their peer reviews
    const pipe = User.aggregate([
      { $unwind: { path: "$review", preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: "$_id",
          count: {
            $sum: {
              $cond: {
                if: { $eq: ["$review.value", 1] },
                then: 1,
                else: 0,
              },
            },
          },
          review: {
            $push: {
              value: "$review.value",
            },
          },
          total: { $sum: 1 },
        },
      },
      {
        $sort: {
          total: -1,
          count: -1,
        },
      },
      { $skip: page * docsPerPage },
      { $limit: docsPerPage },
      {
        $project: {
          review: 1,
        },
      },
    ]);

    let results = await pipe.exec();
    if (results.length !== 0) {
      results = await Promise.all(
        results.map((r) => {
          return User.findById(r._id).select(
            "-password -review -friends -sent -received"
          );
        })
      );
    }

    res.status(200).json({ results });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
});

module.exports = router;
