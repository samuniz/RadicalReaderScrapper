// var express = require("express");
const axios = require('axios');
// const cheerio = require('cheerio');
var mongoose = require("mongoose");

var db = require("../models");

var router = require("express").Router(); 

router.get("/", function(req, res){
  db.Article.find(function(err, data){
    console.log(err)
    var hbsObject = {
      // console.log("This is data", data); 

      article: data
    };
    // console.log("This is hdsObject", hbsObject);
    res.render("index", hbsObject);
  })
}); 
// Favorites Page 
router.get("/favorites", function(req, res){
  db.Article.find({favorite: true},function(err, data){
    var hbsObject = {
      article: data
    };
    console.log("This is hdsObject", hbsObject);
    res.render("favorites", hbsObject);
  })
}); 





module.exports = router;