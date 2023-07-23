const router = require("express").Router();
const authController = require("../controller/authController");
const errorHandler = require("../handler/error");
const User = require("../models/User");

router.post("/recommend/no-auth", async (req, res) => {
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

router.post(
  "/recommend/auth",
  authController.isAuthenticated,
  async (req, res) => {
    try {
      const page = Math.max(0, req.query.page || 0);
      const docsPerPage = 10;

      // Sort the users by difference between current karma and user karma
      const pipe = User.aggregate([
        {
          $match: { _id: { $nin: [req.user._id] } },
        },
        {
          $project: {
            karma: 1,
            name: 1,
            username: 1,
            email: 1,
            handles: 1,
            avatar: 1,
            diff: {
              $abs: { $subtract: ["$karma", req.user.karma] },
            },
          },
        },
        {
          $sort: {
            diff: 1,
          },
        },
        { $skip: page * docsPerPage },
        { $limit: docsPerPage },
      ]);

      let results = await pipe.exec();
      // if (results.length !== 0) {
      //   results = await Promise.all(
      //     results.map((r) => {
      //       return User.findById(r._id).select(
      //         "-password -review -friends -sent -received"
      //       );
      //     })
      //   );
      // }

      res.status(200).json({ results });
    } catch (e) {
      console.log(e);
      errorHandler.handleInternalServer(res);
    }
  }
);

//Return the leaderboard
router.post("/leaderboard/global", async (req, res) => {
  try {
    const temp = User.aggregate([
      {
        $setWindowFields: {
          sortBy: { karma: -1 },
          output: {
            rank: {
              $rank: {},
            },
          },
        },
      },
      {
        $project: {
          karma: 1,
          rank: 1,
          username: 1,
        },
      },
    ]);
    let result = await temp.exec();
    res.status(200).json({ result });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
});

// Return the leaderboard of friends
router.post(
  "/leaderboard/friends",
  authController.isAuthenticated,
  async (req, res) => {
    try {
      const temp = User.aggregate([
        {
          $setWindowFields: {
            sortBy: { karma: -1 },
            output: {
              rank: {
                $rank: {},
              },
            },
          },
        },
        {
          $project: {
            karma: 1,
            rank: 1,
            username: 1,
          },
        },
      ]);
      let result = await temp.exec();
      result = result.filter((user) => {
        return req.user.friends.includes(user._id);
      });
      res.status(200).json({ result });
    } catch (e) {
      console.log(e);
      errorHandler.handleInternalServer(res);
    }
  }
);

module.exports = router;
