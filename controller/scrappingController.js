const cheerio = require("cheerio");
const pretty = require("pretty");
const router = require("express").Router()
const axios = require("axios")

const htmlparser = async (url) => {
    const {
        data
    } = await axios.get(url)
    return data;
}

//codechef scrapping
exports.cc_scrapping = async (req, res) => {
    const username = req.params.cc_name;
    const dom = await htmlparser("https://www.codechef.com/users/gennady.korotkevich")
    const $ = cheerio.load(dom);

    const content = $(".content").children()
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
    const submission = $('div[id="submissions-graph"]').children()

    console.log(submission.find('div > svg > .highcharts-legend highcharts-no-tooltip').text())
    res.json({})
}



//codechef scrapping
exports.cf_scrapping = async (req, res) => {
    const username = req.params.cf_name;
    const dom = await htmlparser("https://codeforces.com/profile/tourist")
    const $ = cheerio.load(dom);

    const content = $(".userbox .info").children()
    console.log($.root().html())
    // code chef rating
    content.find("ul").each((i, ele) => {
        console.log($(ele).text())
    })
    console.log(content.find("ul").html())
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

    res.json({})
}