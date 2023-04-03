require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const saltRounds = 10;
const JWT = require("./JWTController");
const cookie = require("cookie");

// ----------------------------------------------------Helper Functions-----------------------------------------------------

//check if a user is exists or not
const userExists = async (email) => {
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

// -----------------------------------------------------End of helper functions-------------------------------------------------

//------------------------------------------------Middleware for authorization and authentication checks---------------------------------------------

exports.isAuthenticated = async (req, res, next) => {
  const token = req.cookies.access;
  const refreshToken = req.cookies.refresh;
  if (!token && !refreshToken) {
    res.status(403).json({ error: "Unverified user" });
    return;
  }
  let user = JWT.verifyToken(token);
  if (!user) {
    const access = await JWT.regenerateAccessToken(refreshToken);
    if (!access) {
      res.status(403).json({ error: "Invalid Token" });
      return;
    }
    user = JWT.verifyToken(access);
    res.cookie("access", access, {
      httpOnly: true,
      maxAge: JWT.accessExpiry * 1000,
    });
    res.cookie("user", JSON.stringify(user), {
      httpOnly: false,
      maxAge: JWT.accessExpiry * 1000,
    });
  }
  req.user = user._doc;
  next();
};

// --------------------------------------------------------End of Middleware----------------------------------------------------------

//---------------------------------------------------------Authentication Controllers-------------------------------------------------

exports.signup = async (req, res) => {
  try {
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).send({ message: "All fields is required" });
    }

    // Check if Email is Valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const result = await regex.test(email);
    if (result === false) {
      res.status(400).send({ message: "Email is Badly Formatted" });
      return;
    }

    //Check if User is Already Exists
    const isUser = await userExists(req.body.email);
    if (isUser)
      return res
        .status(409)
        .send({ message: "User Already Exist. Please Login" });

    // If User is not already exist and all fields are valid then we will save the user in our database
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await encryptPassword(req.body.password),
    });
    await newUser.save();

    // Get JWT token
    const err = JWT.setCookies(res, newUser);
    if (err) throw err;
    newUser.password = "";
    res.json(newUser);
  } catch (e) {
    console.log(e);
    res.json({ error: e || "Someting went wrong" });
  }
};

exports.signin = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: "All fields is required" });
    }

    // Check if Email is Valid or not
    let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
    const result = await regex.test(email);
    if (result === false) {
      res.status(400).send({ message: "Email is Badly Formatted" });
      return;
    }

    // Check if a User exists or not
    const User = await userExists(req.body.email);

    //If user does not exists then throw error
    if (!User)
      return res
        .status(400)
        .send({ message: "User does not exists. Please Signup" });

    // Check the password is correct or not
    const compareHashedPassword = await comparePassword(
      req.body.password,
      User.password
    );
    if (!compareHashedPassword)
      return res.status(400).send({ message: "Invalid Credentials" });
    //set a token
    const err = JWT.setCookies(res, User);
    if (err) throw err;
    User.password = "";
    res.json(User);
  } catch (e) {
    console.log(e);
    res.json({ error: e || "Something went wrong" });
  }
};

exports.logout = (req, res) => {
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
