const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const db = require("../models");

// Scrape radical reads
router.get("/scrape", function (req, res) {
  // First, we grab the body of the html with axios
  // @ts-ignore
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

//Delete all articles 
router.delete("/scrape", 
function (req, res) {
  db.Article.deleteMany({})
   .then(function () {
     return db.Note.deleteMany({});
   })
   .then(function (dbArticle){
    res.json(dbArticle);
   })
   .catch(function(err){
     res.json(err);
   });
})

// Dislike an article 
router.put("/favoritesdelete/:id", function (req, res) {
  // console.log("req.params.id", req.params.id)
  db.Article.findOneAndUpdate(
    { _id: req.params.id },
    { favorite: false })
    .then(function (dbSave) {
      res.json(dbSave)
    })
    .catch(function (err) {
      res.json(err);
    })
});

// Favorite an article
router.put("/favorites/:id", function (req, res) {
  let articleId = req.params.id
  // event.preventDefault();
  // console.log("req.params.id", req.params.id)
  db.Article.findOneAndUpdate(
    { _id: articleId},
    {
      $set:{ 
      favorite: true 
      }
    })
    .then(function (dbArticle) {
      res.json(dbArticle)
    })
    .catch(function (err) {
      res.json(err);
    })
});

// Save comment
router.post("/favorites/:id", 
function(req, res){
  // console.log("req.body", req.body)
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

// Delete a comment 
router.delete("/favorites/:id/comment/:commentId", function (req, res) {
  db.Note.deleteOne({ _id: req.params.commentId })
    .then(function () {
      return db.Article.updateOne({ _id: req.params.articleId }, 
        { $pull: { note: req.params.commentId } });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
})



   

module.exports = router; 