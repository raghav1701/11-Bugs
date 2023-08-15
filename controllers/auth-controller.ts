import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
const saltRounds = 10;
import { jwtCheck } from "../middlewares";
import { errorHandler } from "../handler";
import User from "../models/User";
import { Request, Response } from "express";
import joi from "joi";

const signUpSchema = joi.object({
    name: joi.string().min(1).max(32).required(),
    username: joi.string().min(1).max(32).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
});

const userExists = async (email, username?: string) => {
    const isUser = await User.findOne({ email: email });
    return isUser;
};

// encrypt the password
const encryptPassword = async (password) => {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
};

// compare the password to hashed password
const comparePassword = async (password, hash) => {
    const result = await bcrypt.compare(password, hash);
    return result;
};

export const signup = async (req: Request, res: Response) => {
    try {
        if (
            !req.body.name ||
            !req.body.email ||
            !req.body.username ||
            !req.body.password
        ) {
            errorHandler.handleBadRequest(res);
            return;
        }

        // Check if Email is Valid or not
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        const result = await regex.test(req.body.email);
        if (result === false) {
            errorHandler.handleBadRequest(res, "Invalid Email Address");
            return;
        }

        //Check if User is Already Exists
        const isUser = await userExists(req.body.email);
        if (isUser)
            return errorHandler.handleConflict(res, "Email already in use.");

        const userName = await User.findOne({ username: req.body.username });
        if (userName)
            return errorHandler.handleConflict(res, "Username already in use.");

        // If User is not already exist and all fields are valid then we will save the user in our database
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: await encryptPassword(req.body.password),
        });
        await newUser.save();

        // Get jwtCheck token
        const err = jwtCheck.setCookies(res, newUser);
        if (err) throw err;
        // newUser.password = "";
        res.status(200).json({ _id: newUser._id });
    } catch (e) {
        errorHandler.handleInternalServer(res);
        // res.json({ error: e || "Someting went wrong" });
    }
};

export const signin = async (req: Request, res: Response) => {
    try {
        if (!req.body.email || !req.body.password) {
            return errorHandler.handleBadRequest(res);
            // res.status(400).send({ message: "All fields is required" });
        }

        // Check if Email is Valid or not
        let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
        const result = await regex.test(req.body.email);
        if (result === false) {
            errorHandler.handleBadRequest(res, "Invalid Email address");
            // res.status(400).send({ message: "Email is Badly Formatted" });
            return;
        }

        // Check if a User exists or not
        const user = await userExists(req.body.email);

        //If user does not exists then throw error
        if (!user)
            return errorHandler.handleNotFound(res, "Invalid Credentials");
        // return res
        //   .status(400)
        //   .send({ message: "User does not exists. Please Signup" });

        // Check the password is correct or not
        const compareHashedPassword = await comparePassword(
            req.body.password,
            user.password,
        );
        if (!compareHashedPassword)
            return errorHandler.handleBadRequest(res, "Invalid Credentials");
        // return res.status(400).send({ message: "Invalid Credentials" });
        //set a token
        const err = jwtCheck.setCookies(res, user);
        if (err) throw err;
        // user.password = "";
        res.status(200).json({ _id: user._id });
    } catch (e) {
        res.json({ error: e || "Something went wrong" });
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie("access", "", {
        httpOnly: true,
    });
    res.cookie("refresh", "", {
        httpOnly: true,
    });
    res.cookie("user", "", {
        httpOnly: false,
    });
    res.json({ success: "Logged out successfully." });
};

// -------------------------------------------------------------End of Authroization Controllers -----------------------------------------------------
