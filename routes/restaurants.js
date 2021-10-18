var express = require("express");
var router = express.Router();

/* restaurants:

id: int
name: string
location: string
pricing: int
url: string
*/

let restaurants = [
  {
    id: 0,
    name: "dipoli",
    location: "aaaaaa",
    pricing: 1,
    url: "dipoli.com",
  },
  {
    id: 1,
    name: "abloc",
    location: "bbbbbbb",
    pricing: 1,
    url: "abloc.com",
  },
  {
    id: 2,
    name: "täffä",
    location: "cccc",
    pricing: 1,
    url: "taffa.com",
  },
  {
    id: 3,
    name: "Computer Science Building",
    location: "dddd",
    pricing: 1,
    url: "csbuilding.com",
  },
];

/* GET all restaurants */
router.get("/", function (req, res, next) {
  res.send(restaurants);
});

router.get("/:name", function (req, res, next) {
  res.send("restaurant with name " + req.params.name);
});


// router.post("/:name", (req, res, next) => {
router.post("/review/:name", (req, res, next) => {
  const rating = req.body.review.rating;
  const rest = req.params.name;

  if (rating > 0 && rating < 6) {
    // insert rating
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
