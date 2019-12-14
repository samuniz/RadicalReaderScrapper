// @ts-nocheck
var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var article = require("../models/Article.js");

// A GET route for scraping the echoJS website
router.get("/scrape", function(req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://radicalreads.com/").then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children(".entry-content").find("h3").text();
      result.link = $(this)
        .children("a")
        .attr("href");

        console.log(result);
      // Create a new Article using the `result` object built from scraping
      // db.Article.create(result)
      //   .then(function(dbArticle) {
      //     // View the added result in the console
      //     console.log(dbArticle);
      //   })
      //   .catch(function(err) {
      //     // If an error occurred, log it
      //     console.log(err);
      //   });
    });

    // Send a message to the client
    res.send("Scrape Complete");
  });
});

module.exports = router;