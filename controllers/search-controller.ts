import { errorHandler } from "../handler";
import User from "../models/User";

export const searchUser = async (req, res) => {
    try {
        const userName = req.body.userName;
        if (!userName) return errorHandler.handleBadRequest(res);
        const user = await User.findOne({ username: userName }).select(
            "name email username karma avatar",
        );
        res.status(200).json({ user });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};
