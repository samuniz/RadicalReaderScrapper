// @ts-nocheck
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");
var router = express.Router();

var db = require("../models/index");

// A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://radicalreads.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    $("article").each(function(i, element) {
      // Save an empty result object
      var result = {};

      result.title = $(this)
        .children(".entry-content").find("h3").text();
      result.image = $(this)
        .children("figure").find("img").attr("src");
      result.category = $(this)
        .children(".entry-content").find(".entry-meta").find("a").text(); 
      result.body = $(this)
        .children(".entry-content").children(".entry-excerpt").text();
      result.link = $(this)
      .children(".entry-content").find("h3").find("a").attr("href");
      result.date = $(this)
      .children(".entry-content").find("footer").find("time").text();


      // console.log(result);
      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;