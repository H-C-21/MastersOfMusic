const express = require("express"),
  app = express();

//setting view engine to ejs
app.set("view engine", "ejs");

//route for index page
app.get("/", function (req, res) {
  res.render("index");
});

//route for magic page
app.get("/index", function (req, res) {
  res.render("magic");
});
