require("dotenv").config();
const User = require("../models/User");

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
  github: { stars: 1, repos: 0.25, commits: 0.5, contributions: 0.75 },
};

// Calculate the github profile score
// stars, number of repos, numbers of commits
// 0-100
exports.calculateGithub = (details) => {
  try {
    //   Basic
    // const { star, contributions, repos, commits } = details;
    // const maxStar = 5000;
    // const maxRepos = 100;
    // const maxCommits = 10000;
    // const maxContributions = 10000;
    // const total =
    //   maxStar * weights.github.stars +
    //   maxRepos * weights.github.repos +
    //   maxCommits * weights.github.commits +
    //   maxContributions * weights.github.contributions;
    // const score =
    //   (Math.min(star, maxStar) / maxStar) * weights.github.stars +
    //   (Math.min(commits, maxCommits) / maxCommits) * weights.github.commits +
    //   (Math.min(repos, maxRepos) / maxRepos) * weights.github.repos +
    //   (Math.min(contributions, maxContributions) / maxContributions) *
    //     weights.github.contributions;
    // return score / total;
    const score =
      ((Number(details.star) * weights.github.stars +
        Number(details.repos) * weights.github.repos +
        Number(details.contributions) * weights.github.contributions +
        Number(details.commits) * weights.github.commits) /
        (Number(details.star) +
          Number(details.repos) +
          Number(details.contributions) +
          Number(details.commits))) *
      100;
    return score;
  } catch (e) {
    return e;
  }
};

exports.calculateCodeForces = (details) => {
  try {
    const { rating } = details;
    var cost = 100 / 10;
    if (rating < 1200) return cost;
    return Math.min((Math.ceil((Number(rating) - 1200) / 225) + 1) * cost, 100);
  } catch (e) {
    return e;
  }
};

exports.calculateCodeChef = (details) => {
  try {
    const { rating } = details;
    var cost = 100 / 22;
    if (rating < 1000) return cost;
    const val = (Math.ceil((Number(rating) - 1000) / 100) + 1) * cost;
    return Math.min(val, 100);
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
      (Number(details.github || 0) * weights.karma.github +
        Number(details.codechef || 0) * weights.karma.codechef +
        Number(details.codeforces || 0) * weights.karma.codeforces) /
      3;
    const review =
      Number(details.upvotes) /
        (Number(details.upvotes) + Number(details.downvotes)) || 0;
    return profiles * weights.karma.profiles + review * weights.karma.review;
  } catch (e) {
    return e;
  }
};
