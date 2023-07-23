const cheerio = require("cheerio");
const pretty = require("pretty");
const router = require("express").Router();
const axios = require("axios");
const scoreController = require("./scoreController");
const errorHandler = require("../handler/error");
const User = require("../models/User");

const htmlparser = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

// github scrapping
exports.gh_scrapping = async (req, res) => {
  try {
    const username = req.params.gh_name;
    const dom = await htmlparser(`https://github.com/${username}`);

    const $ = cheerio.load(dom);
    const content = $(".js-pinned-items-reorder-container ol").children();

    let pinned_repos = [];

    content.each((i, elem) => {
      $(elem)
        .find(".pinned-item-list-item-content")
        .each((j, ele) => {
          var title, description;
          if (j == 0) {
            title = $(ele).find("span").html();
          }

          description = $(ele).find(".pinned-item-desc").text().trim();
          var stars = 0,
            forks = 0;

          $(ele)
            .find(".pinned-item-meta")
            .each((k, e) => {
              if (k == 0) {
                stars = $(e).text().trim();
              }
              if (k == 1) {
                forks = $(e).text().trim();
              }
            });
          let pinned_repo = {
            Title: title,
            Description: description,
            Stars: stars,
            Forks: forks,
          };
          pinned_repos.push(pinned_repo);
          // console.log(stars);
          // console.log(forks);
          // }
        });
    });

    const yearly_contributions = $(".js-yearly-contributions h2");
    const contributions = $(yearly_contributions)
      .text()
      .match(/\d+/g)[0]
      .trim();
    // console.log(pinned_repos);

    let star = 0;
    let repos = 0;
    let commits = 0;

    let one = `https://api.github.com/users/${username}/repos`;
    let two = `https://api.github.com/search/commits?q=author:${username}`;
    // let three =
    //   "https://api.storyblok.com/v1/cdn/stories/vue?version=published&token=wANpEQEsMYGOwLxwXQ76Ggtt";

    const requestOne = await axios.get(one);
    const requestTwo = await axios.get(two);
    // const requestThree = axios.get(three);

    const result1 = requestOne.data;
    const result2 = requestTwo.data;

    result1.map((elem) => {
      star = star + elem.stargazers_count;
      repos++;
    });
    commits = result2.total_count;
    // console.log(star);
    // console.log(repos);
    // console.log(commits);

    const score = scoreController.calculateGithub({
      star,
      repos,
      commits,
      contributions,
    });

    // res.json({ pinned_repos, star, repos, commits });
    res.json({
      stats: [
        { value: star, label: "Star" },
        { value: repos, label: "Repository Count" },
        { value: commits, label: "Total Commits" },
        { value: contributions, label: "Cntributions" },
      ],
      other: { value: pinned_repos, label: "Pinned Repositories" },
      score,
    });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
};

//codechef scrapping
exports.cc_scrapping = async (req, res) => {
  try {
    const username = req.params.cc_name;
    const dom = await htmlparser(`https://www.codechef.com/users/${username}`);
    const $ = cheerio.load(dom);

    const content = $(".content").children();
    // code chef rating
    const rating = content.find(".rating-number").text();
    // stars
    const stars = content.find(".rating-star").text().length;
    // max rating
    const max_rating = content.find("small").text().match(/\d+/g)[0];
    // ranking
    // gloabl
    const content1 = content.find(".rating-ranks ul").children();
    var global_ranking = 0,
      country_ranking = 0;
    $(content1).each((i, elem) => {
      // console.log(i);
      if (i == 0) {
        global_ranking = $(elem).find("a strong").text();
      }
      if (i == 1) {
        country_ranking = $(elem).find("a strong").text();
      }
    });
    // const global_ranking = content
    //   .find(".rating-ranks .inline-list ul")
    //   .text();
    // // country
    // const country_ranking = content
    //   .find(".rating-ranks .inline-list strong")
    //   .text();

    // submission

    const fully_partially_content = $(".problems-solved .content h5");
    const fully_solved = fully_partially_content.text().match(/\d+/g)[0];
    const partially_solved = fully_partially_content.text().match(/\d+/g)[1];
    // console.log(fully_partially_content.text().match(/\d+/g));
    // console.log(fully_solved);
    // console.log(partially_solved);
    const score = scoreController.calculateCodeChef({ rating: max_rating });
    res.json({
      score,
      stats: [
        { value: stars, label: "Stars" },
        { value: max_rating, label: "Maximum Rating" },
        { value: global_ranking, label: "Gloabal Ranking" },
        { value: country_ranking, label: "Country Ranking" },
        { value: fully_solved, label: "Fully Solved Questions" },
        { value: partially_solved, label: "Partially Solved Questions" },
      ],
    });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
};

//codeForces scrapping
exports.cf_scrapping = async (req, res) => {
  try {
    const username = req.params.cf_name;
    const dom = await htmlparser(`https://codeforces.com/profile/${username}`);
    const $ = cheerio.load(dom);

    const content = $(".userbox .info").children();
    const footer = $("._UserActivityFrame_countersRow");
    const rank = content.find(".user-rank span").text();
    let rank1 = "Unrated";

    let curr_rating = 0,
      max_rating = 0,
      contributions = 0;
    if (rank.trim() !== rank1.trim()) {
      content.find("li").each((i, ele) => {
        $(ele)
          .find("span")
          .each((j, spa) => {
            if (i == 0 && j == 0) {
              curr_rating = $(spa).text();
            }
            if (i == 0 && j == 3) {
              max_rating = $(spa).text();
            }
            if (i == 1 && j == 0) {
              contributions = $(spa).text();
            }
          });
      });
    }
    // console.log(curr_rating);
    // console.log(max_rating);
    // console.log(contributions);

    let all_time, last_year, last_month;

    footer.find("._UserActivityFrame_counter").each((i, elem) => {
      if (i == 0) {
        all_time = $(elem)
          .find("._UserActivityFrame_counterValue")
          .text()
          .match(/\d+/g)[0];
      }
      if (i == 1) {
        last_year = $(elem)
          .find("._UserActivityFrame_counterValue")
          .text()
          .match(/\d+/g)[0];
      }
      if (i == 2) {
        last_month = $(elem)
          .find("._UserActivityFrame_counterValue")
          .text()
          .match(/\d+/g)[0];
      }
    });

    // console.log(all_time);
    // console.log(last_year);
    // console.log(last_month);
    const score = scoreController.calculateCodeForces({ rating: curr_rating });
    res.json({
      score,
      stats: [
        { value: rank.trim(), label: "Rank" },
        { value: curr_rating, label: "Current Rating" },
        { value: max_rating, label: "Maximum Rating" },
        { value: contributions, label: "Number of Contributions" },
        { value: all_time, label: "Solved Questions - All Time" },
        { value: last_year, label: "Solved Questions - Last Year" },
        { value: last_month, label: "Solved Questions - Last Month" },
      ],
    });
  } catch (e) {
    console.log(e);
    errorHandler.handleInternalServer(res);
  }
};
