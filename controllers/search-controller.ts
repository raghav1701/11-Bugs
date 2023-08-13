import { errorHandler } from "../handler";
import User from "../models/User";

export const searchUser = async (req, res) => {
    try {
        const { query } = req.body;
        if (!query) return errorHandler.handleBadRequest(res);
        const user = await User.findOne({ username: query }).select(
            "name email username karma avatar",
        );
        res.status(200).json({ user });
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};
