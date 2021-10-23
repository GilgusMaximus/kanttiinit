var express = require("express");
var router = express.Router();

var mealRouter = require('./meals');
var rratingRouter = require('./rratings');

const db = require('../db/datastore');

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
    db.getAllRestaurants()
    res.send(restaurants);
});

router.get("/:name", function (req, res, next) {
    res.send(restaurants[0])
});

router.use('/:name/meals/', function (req, res, next) {
    req.restaurant = req.params.name;
    next();
}, mealRouter);

router.use('/:name/ratings/', function (req, res, next) {
    req.restaurant = req.params.name;
    next();
}, rratingRouter);

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
