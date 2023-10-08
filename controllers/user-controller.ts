import User from "../models/User";
import * as scoreController from "./score-controller";
import { errorHandler } from "../handler";

export const updateUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user._id, {
            name: req.body.name || req.user.name,
            email: req.body.email || req.user.email,
            resume: req.body.resume || req.user.resume,
            avatar: req.body.avatar || req.user.avatar,
        });
        res.status(200).json({ message: "Updated!" });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};

export const updateUserScores = async (req, res) => {
    try {
        const { code, score, userID } = req.body;

        const user = await User.findById(userID);
        if (!user) return errorHandler.handleBadRequest(res);
        const upvoteList = user.review.filter((r) => r.value === 1);
        const upvotes =
            upvoteList.length !== 0 ? upvoteList.reduce((p, c) => p + c) : 0;

        const downvoteList = user.review.filter((r) => r.value === -1);
        const downvotes =
            downvoteList.length !== 0
                ? downvoteList.reduce((p, c) => p + c)
                : 0;

        const karma = scoreController.calculateKarma({
            github: user.scores.github,
            codeforces: user.scores.codeforces,
            codechef: user.scores.codechef,
            upvotes,
            downvotes,
        });

        if (!code) return errorHandler.handleBadRequest(res);
        const field = {};
        field["scores." + code.toLowerCase()] = score || 0;

        const update = await User.findByIdAndUpdate(userID, {
            ...field,
            karma: karma,
        });

        res.status(200).json({ karma: karma });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await User.findById(id).select("-password").populate({
            path: "friends received sent",
            select: "name avatar karma",
        });
        if (!user) return errorHandler.handleNotFound(res, "User Not Found");
        res.status(200).json({ user });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};

export const upvoteProfile = async (req, res) => {
    try {
        const id = req.params.id;
        // if (req.user._id.equals(id)) return   errorHandler.handleBadRequest(res);

        const user = await User.findById(id);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");
        await User.findByIdAndUpdate(id, {
            $pull: { review: { user: req.user._id } },
        });
        await User.findByIdAndUpdate(id, {
            $push: { review: { user: req.user._id, value: 1 } },
        });
        res.status(200).json({ message: "Upvoted!" });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};

export const downvoteProfile = async (req, res) => {
    try {
        const id = req.params.id;
        // if (req.user._id.equals(id)) return   errorHandler.handleBadRequest(res);

        const user = await User.findById(id);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");
        await User.findByIdAndUpdate(id, {
            $pull: { review: { user: req.user._id } },
        });
        const update = await User.findByIdAndUpdate(id, {
            $push: { review: { user: req.user._id, value: -1 } },
        });
        res.status(200).json({ message: "Downvoted!" });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};

export const updateHandle = async (req, res) => {
    try {
        if (!req.body.code) return errorHandler.handleBadRequest(res);
        const field = {};
        field["handles." + req.body.code.toLowerCase()] = req.body.handle;
        const update = await User.findByIdAndUpdate(req.user._id, field);
        res.status(200).json({ message: "Updated!" });
    } catch (error) {
        errorHandler.handleInternalServer(res);
    }
};
