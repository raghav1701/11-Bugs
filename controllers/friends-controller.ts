import User from "../models/User";
import { errorHandler } from "../handler";

export const getAllFriends = async (req, res) => {
    try {
        const friends = await Promise.all(
            req.user.friends.map((id) => User.findById(id).select("-password")),
        );
        res.status(200).json({ friends });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const createFriendRequest = async (req, res) => {
    try {
        if (req.body.userID === req.user._id)
            return errorHandler.handleBadRequest(res);

        const user = await User.findById(req.body.userID);
        if (!user) return errorHandler.handleBadRequest(res, "User not found!");

        const already = user.friends.find((u) => u.equals(req.user._id));
        if (already)
            return errorHandler.handleBadRequest(res, "Already a friend!");

        // Already requested by other
        if (req.user.sent) {
            const sent = req.user.sent.find((r) => r.equals(user._id));
            if (sent) return errorHandler.handleBadRequest(res);
        }
        if (user.sent) {
            const sent = user.sent.find((r) => r.equals(req.user._id));
            if (sent) return errorHandler.handleBadRequest(res);
        }

        // Update the logged in user
        await User.findByIdAndUpdate(user._id, {
            $push: { received: req.user._id },
        });
        await User.findByIdAndUpdate(req.user._id, {
            $push: { sent: user._id },
        });

        res.status(200).json({ message: "Requested!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const getFriendRequest = (req, res) => {
    try {
        res.status(200).json({ received: req.user.received || [] });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const getRequestSent = (req, res) => {
    try {
        res.status(200).json({ sent: req.user.sent || [] });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const removeFriend = async (req, res) => {
    try {
        if (req.body.user === req.user._id)
            return errorHandler.handleBadRequest(res);

        const user = await User.findById(req.body.user);
        if (!user) return errorHandler.handleBadRequest(res, "User not found!");

        const already = user.friends.find((u) => u.equals(req.user._id));
        if (!already)
            return errorHandler.handleBadRequest(res, "Not a friend!");

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { friends: user._id },
        });

        // Update the friend
        await User.findByIdAndUpdate(user._id, {
            $pull: { friends: req.user._id },
        });

        res.status(200).json({ message: "Removed friend!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const acceptRequest = async (req, res) => {
    try {
        const userID = req.body.user;
        if (!userID) return errorHandler.handleBadRequest(res);

        const user = await User.findById(userID);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");

        const received = req.user.received.find((r) => r.equals(userID));
        if (!received) return errorHandler.handleBadRequest(res);

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { received: user._id },
            $push: { friends: user._id },
        });

        // Update the friend
        await User.findByIdAndUpdate(user._id, {
            $pull: { sent: req.user._id },
            $push: { friends: req.user._id },
        });

        res.status(200).json({ message: "Accepted request!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};

export const declineRequest = async (req, res) => {
    try {
        const userID = req.body.user;
        if (!userID) return errorHandler.handleBadRequest(res);

        const user = await User.findById(userID);
        if (!user) return errorHandler.handleNotFound(res, "User Not Found!");

        if (req.user.received) {
            const request = req.user.received.find((r) => r.equals(userID));
            if (!request) return errorHandler.handleBadRequest(res);
        }

        // Update the logged in user
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { received: user._id },
        });
        await User.findByIdAndUpdate(userID, {
            $pull: { sent: req.user._id },
        });

        res.status(200).json({ message: "Declined request!" });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};
