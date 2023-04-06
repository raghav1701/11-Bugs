require("dotenv").config();
const User = require("../models/user");

// Constants
// 0-1
const weights = {
  karma: {
    github: 1,
    codechef: 1,
    codeforces: 1,
    profiles: 0.75,
    review: 0.25,
  },
  github: { stars: 1, repos: 1, commits: 1 },
};

// Calculate the github profile score
// stars, number of repos, numbers of commits
// 0-100
exports.calculateGithub = (details) => {
  try {
    //   Basic
    const score =
      Math.exp(-details.score) * weights.github.stars +
      Math.exp(-details.repos) * weights.github.repos +
      Math.exp(-details.commits) * weights.github.commits;
    return (1 - score / 3) * 100;
  } catch (e) {
    return e;
  }
};

exports.calculateCodeForces = (details) => {
  try {
    const { rating } = details;
    var cost = 100 / 10;
    if (rating < 1200) return cost;
    return Math.max((Math.ceil((rating - 1200) / 225) + 1) * cost, 100);
  } catch (e) {
    return e;
  }
};

exports.calculateCodeChef = (details) => {
  try {
    const { rating } = details;
    var cost = 100 / 22;
    if (rating < 1000) return cost;
    return Math.max((Math.ceil((rating - 1000) / 100) + 1) * cost, 100);
  } catch (e) {
    return e;
  }
};

// Calculate the total karma
// github, codechef, codeforces, upvotes, downvotes
// 0-100
exports.calculateKarma = (details) => {
  try {
    //   Basic
    const profiles =
      (details.github * weights.karma.github +
        details.codechef * weights.karma.codechef +
        details.codeforces * weights.karma.codeforces) /
      3;
    const review = details.upvotes / (details.upvotes + details.downvotes);
    return profiles * weights.karma.profiles + review * weights.karma.review;
  } catch (e) {
    return e;
  }
};
