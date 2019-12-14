// @ts-nocheck
var express = require("express");
var mongoose = require("mongoose");
// Set Handlebars.
var exphbs = require("express-handlebars");
var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
var routes = require("./routes/routes.js");

app.use(routes);
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");

// Require all models

// Initialize Express

// Configure middleware

// Use morgan logger for logging requests
// Parse request body as JSON

// Connect to the Mongo DB

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://radicalReaders:radical1@ds253368.mlab.com:53368/heroku_6br9pzm3", 
  {
    useMongoCliente: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  
);
// mongoose.connect("mongodb://localhost/unit18Populater", { useNewUrlParser: true });

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});