var express = require("express");
var router = express.Router();

var mealRouter = require('./meals');
var rratingRouter = require('./rratings');

const db = require('../db/datastore');

/* GET all restaurants and res meals */
router.get("/", function (req, res, next) {
    db.getAllRestaurants().then(response => {
        res.send(response)
    });
});

router.get("/:name", function (req, res, next) {
    db.getRestaurantAndMeals(req.params.name).then(response => {
        res.send(response)
    })

    db.getWeeklyMealsDateRestaurant("25/10/2021", req.params.name).then(r => {
        console.log(r)
    })
});

router.use('/:name/meals/', function (req, res, next) {
    req.restaurant = req.params.name;
    next();
}, mealRouter);


router.use('/:name/ratings/', function (req, res, next) {
    req.restaurant = req.params.name;
    next();
}, rratingRouter);


module.exports = router;
