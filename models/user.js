const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  // username: {
  //   type: String,
  //   require: true,
  //   unique: true,
  // },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },

  // Overall Score
  karma: {
    type: Number,
    default: 0,
  },

  // Profile Handles
  github: { type: String },
  codechef: { type: String },
  codeforces: { type: String },

  // Users who reviewed this user
  // Neutral 0
  // Upvote 1
  // Downvote -1
  review: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      value: { type: Number, default: 0, enum: [-1, 0, 1] },
    },
  ],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
