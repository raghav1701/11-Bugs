import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { errorHandler } from "../handler";
import User from "../models/User.js";

dotenv.config();

export const accessExpiry = 60 * 15; // 15 minutes
export const refreshExpiry = 60 * 60 * 24 * 30; // 30 days

// Set the cookies and create a token
export const setCookies = (res, user) => {
    try {
        const token = createJWT(user);
        const refreshToken = createRefreshToken(user);
        res.cookie("access", token, {
            httpOnly: true,
            maxAge: accessExpiry * 1000,
        });
        res.cookie(
            "user",
            JSON.stringify({
                _id: user._id,
            }),
            {
                httpOnly: false,
                maxAge: accessExpiry * 1000,
            },
        );
        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            maxAge: refreshExpiry * 1000,
        });

        return null;
    } catch (e) {
        return e;
    }
};

// Create a new jwt token
export const createJWT = (user) => {
    try {
        return jwt.sign(
            {
                _id: user._id,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: accessExpiry,
            },
        );
    } catch (e) {
        return e;
    }
};

// Create a new refresh token
export const createRefreshToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: refreshExpiry,
    });
};

// Generate access token using refresh token
export const regenerateAccessToken = async (refreshToken) => {
    if (!refreshToken) return null;
    const ver = verifyToken(refreshToken);
    if (!ver) return null;
    const user = await User.findById(ver._id);
    if (!user) return null;
    return createJWT(user);
};

// Verify a token
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        return null;
    }
};

export const jwtCheck = async (req, res, next) => {
    try {
        const token = req.cookies.access;
        const refreshToken = req.cookies.refresh;
        if (!token && !refreshToken) {
            // res.status(403).json({ error: "Unverified user" });
            errorHandler.handleUnauthorized(res);
            return;
        }
        let user = verifyToken(token);
        if (!user) {
            const access = await regenerateAccessToken(refreshToken);
            if (!access) {
                // res.status(403).json({ error: "Invalid Token" });
                errorHandler.handleUnauthorized(res);
                return;
            }
            user = verifyToken(access);
            res.cookie("access", access, {
                httpOnly: true,
                maxAge: accessExpiry * 1000,
            });
            res.cookie("user", JSON.stringify(user), {
                httpOnly: false,
                maxAge: accessExpiry * 1000,
            });
        }
        req.user = await User.findById(user._id).select("-password");
        // req.user = user;
        next();
    } catch (e) {
        errorHandler.handleInternalServer(res);
    }
};
