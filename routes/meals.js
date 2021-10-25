var express = require("express");
var router = express.Router();

var db = require('../db/datastore')

/* GET all meals from restaurant for today? */
router.get("/", function (req, res, next) {
    res.send(req.restaurant);
});

/**
 * DB relies on meal parsing to add foods to the datastore. This should be implemented somewhere here.
 */

router.get(":meal/", function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;

    db.getMeal(restaurant, meal).then(r => {
        res.send(r)
    })
})

router.post("/:meal/review/", function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const rating = req.body.rating;

    db.addMealRating(restaurant, meal, rating).then(r => {
        res.send(r)
    })
});


router.post("/:meal/image/", function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const image = req.body.image;
});

module.exports = router;
