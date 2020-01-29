const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
// var axios = require("axios"); 
const PORT = process.env.PORT || 3000;

//initialize Express app
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//Require set up handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
const routes = require("./routes/routes");
app.use(routes);

const htmlRoutes = require("./routes/htmlRoutes")
app.use(htmlRoutes);

// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/radical-reads-scrape";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected to Mongoose!");
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});