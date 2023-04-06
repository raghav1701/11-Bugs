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
  avatar: {
    type: String
  },

  // Overall Score
  karma: {
    type: Number,
    default: 0,
  },

  // Profile Handles
  handles: {
    github: {
      type: String,
      require: true,
      default: ""
    },
    codechef: {
      type: String,
      require: true,
      default: ""
    },
    codeforces: {
      type: String,
      require: true,
      default: ""
    },
  },

  // Profile Scores
  scores: {
    github: {
      type: Number,
      require: true,
      default: 0
    },
    codechef: {
      type: Number,
      require: true,
      default: 0
    },
    codeforces: {
      type: Number,
      require: true,
      default: 0
    },
  },

  // Users who reviewed this user
  // Neutral 0
  // Upvote 1
  // Downvote -1
  review: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    value: {
      type: Number,
      default: 0,
      enum: [-1, 0, 1]
    },
  }, ],

  // Resume
  resume: { type: String, default: "", require: true },

  // Friends
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  sent: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  received: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;