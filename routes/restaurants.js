var express = require("express");
var router = express.Router();

var mealRouter = require('./meals');
var rratingRouter = require('./rratings');


let restaurants = [
    {
        id: 0,
        name: "dipoli",
        location: "aaaaaa",
        pricing: 1,
        url: "https://www.foodandco.fi/en/restaurants/Ravintolat-kaupungeittain/espoo/dipoli/",
        meals: {
            Lunch_1: ["Meatballs", "rice", "banana"],
            Lunch_2: ["Meatballs", "rice", "banana"],
            Chefs_Corner: ["Meatballs", "rice", "banana"],
        },
    },
    {
        id: 1,
        name: "abloc",
        location: "bbbbbbb",
        pricing: 1,
        url: "https://www.foodandco.fi/en/restaurants/Ravintolat-kaupungeittain/espoo/dipoli/",
        meals: {
            Lunch_1: ["Meatballs", "rice", "banana"],
            Lunch_2: ["Meatballs", "rice", "banana"],
            Chefs_Corner: ["Meatballs", "rice", "banana"],
        },
    },
    {
        id: 2,
        name: "täffä",
        location: "cccc",
        pricing: 1,
        url: "https://www.foodandco.fi/en/restaurants/Ravintolat-kaupungeittain/espoo/dipoli/",
        meals: {
            Lunch_1: ["Meatballs", "rice", "banana"],
            Lunch_2: ["Meatballs", "rice", "banana"],
            Chefs_Corner: ["Meatballs", "rice", "banana"],
        },
    },
    {
        id: 3,
        name: "Computer Science Building",
        location: "dddd",
        pricing: 1,
        url: "https://www.foodandco.fi/en/restaurants/Ravintolat-kaupungeittain/espoo/dipoli/",
        meals: {
            Lunch_1: ["Meatballs", "rice", "banana"],
            Lunch_2: ["Meatballs", "rice", "banana"],
            Chefs_Corner: ["Meatballs", "rice", "banana"],
        },
    },
];

/* GET all restaurants */
router.get("/", function (req, res, next) {
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
