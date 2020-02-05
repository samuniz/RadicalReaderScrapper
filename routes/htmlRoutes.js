const express = require("express");
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require("mongoose");
const db = require("../models");

const router = require("express").Router();

router.get("/", function (req, res) {
  db.Article.find({ "favorite": false })
    // .sort({ _id: -1 })
    .then(function (dbArticle) {
      const hbsObject = {
        article: dbArticle
      };
      res.render("index", hbsObject);
    })
    .catch(function (err) {
      res.json(err);
    });
})


router.get("/favorites", function (req, res) {

  db.Article.find({
    "favorite": true
  })
    // .sort({ _id: -1 })
    .populate("note")
    .then(function (dbArticle) {
      const hbsObject = {
        article: dbArticle
      };
      // console.log("This is hdsObject", hbsObject);
      res.render("favorites", hbsObject);
    })
    .catch(function (err) {
      res.json(err);
    });
});



module.exports = router;