const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const ejs = require("ejs");
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("home");
})

app.post("/", function(req, res) {
  const url = "https://movielens-ap.herokuapp.com/movies/content/?movie=" + req.body.movie + "&limit=15"
  axios
    .get(url)
    .then(response => {
      var content = response.data.content;
      res.render("movies", {content: content, title: req.body.movie});
    })
    .catch(error => {
      console.log(error.statusCode);
    });
})


app.listen(3000, function() {
  console.log("server up on 3000");
})
