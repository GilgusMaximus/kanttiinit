var express = require("express");
var router = express.Router();

let restaurants = [
  {
    name: "täffä",
    rating: 4,
  },
  {
    name: "dipoli",
    rating: 5,
  },
  {
    name: "abloc",
    rating: 5,
  },
];

/* GET all reviews for a certain mealid */
router.get("/meal/id:", function (req, res, next) {
  res.send("meal review: " + req.params.id);
});


router.post("/meal/", (req, res, next) => {
  const rating = req.body.review.rating;
  if (rating > 0 && rating < 6) {
    // insert rating
  } else {
    return res.sendStatus(400);
  }
});

module.exports = router;
