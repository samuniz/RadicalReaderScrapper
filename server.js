var express = require("express");
var mongoose = require("mongoose");

var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public/assets"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Import routes and give the server access to them.
var routes = require("./routes/routes");
var htmlRoutes = require("./routes/htmlRoutes")
// Hook it up the routes 
app.use(routes);
app.use(htmlRoutes);

// Connect to the Mongo DB
mongoose.connect(
  // process.env.MONGODB_URI || 
"mongodb://localhost/unit18Populater", 
  // "mongodb://radicalReaders:radical1@ds253368.mlab.com:53368/heroku_6br9pzm3", 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },

);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});