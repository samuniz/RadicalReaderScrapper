var express = require("express");
const axios = require('axios');
// const cheerio = require('cheerio');
var mongoose = require("mongoose");

var db = require("../models");

var router = require("express").Router(); 

router.get("/", function(req, res){
  db.Article.find(function(err, data){
    // console.log(err)
    var hbsObject = {
      article: data  
    };
    res.render("index", hbsObject);
  })
}); 

// Favorites Page 

router.get("/favorites", function(req, res) {
  db.Article.find({favorite: true})
    .sort({ _id: -1 })
    .populate("note")
    .exec(function(err, data) {
      if (err) {
        console.log(err);
      } else {
        const artcl = { article: data };
        res.render("favorites", artcl);
      }
    });
});


// router.get("/favorites", function (req, res) {
//   db.Article.find({ "favorite": true })
//     .populate("note")
//     .then(function (dbArticle) {
//       const hbsObject = {
//         articles: dbArticle
//       };
//       res.render("favorites", hbsObject);
//     })
//     .catch(function (err) {
//       res.json(err);
//     });
// })








module.exports = router;