var express = require("express");
var router = express.Router();
var path = require("path");

/* GET home page. */
router.get("/", function (req, res, next) {
  //res.render("index", { title: "Express" });
  console.log("path.join(__dirname, \"../react-app\", \"build\", \"index.html\")", path.join(__dirname, "../react-app", "build", "index.html"))
  res.sendFile(path.join(__dirname, "../react-app", "build", "index.html"))
});

module.exports = router;
