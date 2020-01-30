const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

// A GET route for scraping the echoJS website
router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  axios.get("https://radicalreads.com/")
    .then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      const $ = cheerio.load(response.data);
      $("article").each(function (i, element) {
        // Save an empty result object
        const result = {};
        // console.log("result", result)

        result.title = $(this)
          .children(".entry-content").find("h3").text();
        result.image = $(this)
          .children("figure").find("img").attr("src");
        result.body = $(this)
          .children(".entry-content").children(".entry-excerpt").text();
        result.link = $(this)
          .children(".entry-content").find("h3").find("a").attr("href");
        result.date = $(this)
          .children(".entry-content").find("footer").find("time").text();
        // console.log("result", result)

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            // console.log("This is dbArticle", dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, log it
            console.log(err);
          });
      });

      // Send a message to the client
      res.send("Scrape Complete");
    });
});

// Route for delete articles 
router.get("/clear", function (req, res) {
  db.Article.remove({}, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("removed all articles");
    }
    res.redirect("/");
  })
})

router.put("/favorites/:id", function (req, res) {
  // console.log("req.params.id", req.params.id)
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { favorite: true })
    .then(function (dbSave) {
      res.json(dbSave)
    })
    .catch(function (err) {
      res.json(err);
    })
});

// Get the article id and update the note value to true 
router.post("/articles/:id", function(req, res){
  console.log("req.body", req.body)
    db.Note.create(req.body)
      .then(function(dbNote){
        return db.Article.findOneAndUpdate(
          {_id:req.params.id}, 
          { $push:
            { note: dbNote._id}
          }, {new: true});
        })
        .then(function(dbArticle){
          res.json(dbArticle)
        })
        .catch(function(err){
          res.json(err);
        })
      });







module.exports = router; 