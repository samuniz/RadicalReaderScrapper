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
            console.log("This is dbArticle", dbArticle);
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
  console.log("req.params.id", req.params.id)
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



// router.put("/favorites/:id", function (req, res) {
//   var articleId = req.params._id;

//   console.log("req.params", req.params)
//   db.Article.findOneAndUpdate(
//       { _id: articleId },
//       {
//           $set: {
//               favorite: true
//           }
//       }
//   )
//       .then(function (dbSave) {
//           res.json(dbSave)
//       })
//       .catch(function (err) {
//           res.json(err);
//       })
// });

// // Route for saving 
// router.put("/save/:id", function(req, res) {
//   db.Article.updateOne({_id:req.params.id},{favorite:true})
//   .then(function(data,err){
//     console.log("err", err, "data", data)
//   })
//   console.log("Smack the route", req.params.id);
// });

// Route for saving 



// // Get the article id and update the note value to true 
// router.get("/article/:id", function(req, res){
//   console.log("this is req.body", req.body)
//     db.Note.create(req.body)
//       .then(function(dbNote){
//         return db.Article.finOneAndUpdate({
//           _id:req.params.id}, { note: dbNote._id}, {new: true});
//         })
//         .then(function(dbArticle){
//           res.json(dbArticle)
//           console.log("This is DB Article: " + dbArticle)
//         })
//         .catch(function(err){
//           res.json(err);
//         })
//         // res.send("Id")
//       });



// // Add a note 
// router.get("/note/:id", function(req, res) {
//   // db.Note.create(res.body)
//   db.Article.findOne({ _id: req.params.id })

//   .populate("Note")
//     .then(function(dbArticle) {
//       // If we were able to successfully find an Article with the given id, send it back to the client
//       res.json(dbArticle);
//     })
//     .catch(function(err) {
//       // If an error occurred, send it to the client
//       res.json(err);
//   // .then(function(data,err){
//   //   console.log("err", err, "data", data)
//   })
//   console.log("Smack the route", req.params.id);
//   res.json(req.params); 
// });





module.exports = router; 