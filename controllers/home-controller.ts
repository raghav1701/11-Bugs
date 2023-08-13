import User from "../models/User";
import * as errorHandler from "../handler/error.js";

export const recommend = async (req, res) => {
    try {
        const page = Math.max(0, req.query.page || 0);
        const docsPerPage = 1;

        // Sort the users by their peer reviews

        const results = await User.find({
            _id: {
                $nin: [req.body.user],
            },
        })
            .sort({
                karma: -1,
            })
            .skip(docsPerPage * page)
            .limit(docsPerPage)
            .select("-password -friends -sent -received");
        res.status(200).json({
            results,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const recommendNoAuth = async (req, res) => {
    try {
        const page = Math.max(0, req.query.page || 0);
        const docsPerPage = 1;

        // Sort the users by their peer reviews

        const pipe = User.aggregate([
            {
                $match: {
                    _id: {
                        $nin: [req.body.user],
                    },
                },
            },
            {
                $unwind: {
                    path: "$review",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $group: {
                    _id: "$_id",
                    count: {
                        $sum: {
                            $cond: {
                                if: {
                                    $eq: ["$review.value", 1],
                                },
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
                    total: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    total: -1,
                    count: -1,
                },
            },
            {
                $skip: page * docsPerPage,
            },
            {
                $limit: docsPerPage,
            },
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
                        "-password -friends -sent -received",
                    );
                }),
            );
        }

        res.status(200).json({
            results,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const recommendAuth = async (req, res) => {
    try {
        const page = Math.max(0, req.query.page || 0);
        const docsPerPage = 1;

        // Sort the users by difference between current karma and user karma
        const pipe = User.aggregate([
            {
                $match: {
                    _id: {
                        $nin: [req.user._id, ...req.body.prev],
                    },
                },
            },
            {
                $project: {
                    review: 1,
                    karma: 1,
                    name: 1,
                    username: 1,
                    email: 1,
                    handles: 1,
                    avatar: 1,
                    diff: {
                        $abs: {
                            $subtract: ["$karma", req.user.karma],
                        },
                    },
                },
            },
            {
                $sort: {
                    diff: 1,
                },
            },
            {
                $skip: page * docsPerPage,
            },
            {
                $limit: docsPerPage,
            },
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

        res.status(200).json({
            results,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const globalLeaderboard = async (req, res) => {
    try {
        const temp = User.aggregate([
            {
                $setWindowFields: {
                    sortBy: {
                        karma: -1,
                    },
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
        res.status(200).json({
            result,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const friendsLeaderboard = async (req, res) => {
    try {
        const temp = User.aggregate([
            {
                $setWindowFields: {
                    sortBy: {
                        karma: -1,
                    },
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
        res.status(200).json({
            result,
        });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};
