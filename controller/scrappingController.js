const cheerio = require("cheerio");
const pretty = require("pretty");
const router = require("express").Router();
const axios = require("axios");

const htmlparser = async (url) => {
  const { data } = await axios.get(url);
  return data;
};

//codechef scrapping
exports.cc_scrapping = async (req, res) => {
  const username = req.params.cc_name;
  const dom = await htmlparser(
    "https://www.codechef.com/users/gennady.korotkevich"
  );
  const $ = cheerio.load(dom);

  const content = $(".content").children();
  // code chef rating
  // console.log(content.find(".rating-number").text());
  // stars
  // console.log(content.find(".rating-star").text().length);
  // max rating
  // console.log(content.find("small").text().match(/\d+/g)[0]);
  // ranking
  // gloabl
  // console.log(content.find(".rating-ranks .inline-list strong").text()[0])
  // country
  // console.log(content.find(".rating-ranks .inline-list strong").text()[1])

  // submission

  const fully_partially_content = $(".problems-solved .content h5");
  const fully_solved = fully_partially_content.text().match(/\d+/g)[0];
  const partially_solved = fully_partially_content.text().match(/\d+/g)[1];
  console.log(fully_partially_content.text().match(/\d+/g));
  console.log(fully_solved);
  console.log(partially_solved);

  res.json({});
};

//codechef scrapping
exports.cf_scrapping = async (req, res) => {
  const username = req.params.cf_name;
  const dom = await htmlparser(
    "https://codeforces.com/profile/fffffffffffffffffffff"
  );
  const $ = cheerio.load(dom);

  const content = $(".userbox .info").children();
  const footer = $("._UserActivityFrame_countersRow");
  const rank = content.find(".user-rank span").text();
  let rank1 = "Unrated";
  // console.log($.root().html())
  // res.json({
  //     "heml": $.root().html()
  // })
  // code chef rating
  // content.find("ul").each((i, ele) => {
  //     console.log($(ele).text())
  // })
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
      // const curr_rating = $(ele).find(".user-legendary").text().slice(0, 4);
      // const len = $(ele).find(".user-legendary").text().length;
      // console.log(curr_rating);
      // const max_rating = $(ele)
      //   .find(".user-legendary")
      //   .text()
      //   .slice(len - 4, len);
      // console.log(max_rating);
      // console.log($(ele).find(".user-legendary").text());
    });
  }
  console.log(curr_rating);
  console.log(max_rating);
  console.log(contributions);

  let all_time, last_year, last_month;

  footer.find("._UserActivityFrame_counter").each((i, elem) => {
    if (i == 0) {
      all_time = $(elem).find("._UserActivityFrame_counterValue").text();
    }
    if (i == 1) {
      last_year = $(elem).find("._UserActivityFrame_counterValue").text();
    }
    if (i == 2) {
      last_month = $(elem).find("._UserActivityFrame_counterValue").text();
    }
  });

  console.log(all_time);
  console.log(last_year);
  console.log(last_month);

  // console.log(content.find(".rating-number").text());
  // stars
  // console.log(content.find(".rating-star").text().length);
  // max rating
  // console.log(content.find("small").text().match(/\d+/g)[0]);
  // ranking
  // gloabl
  // console.log(content.find(".rating-ranks .inline-list strong").text()[0])
  // country
  // console.log(content.find(".rating-ranks .inline-list strong").text()[1])

  res.json({});
};
