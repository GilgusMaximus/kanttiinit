var express = require("express");
var router = express.Router();

var mealRouter = require('./meals');
var rratingRouter = require('./rratings');

const db = require('../db/datastore');

/* GET all restaurants and res meals */
router.get("/", function (req, res, next) {
    db.getAllRestaurantsAndMeals(req.query["day"]).then(response => {
        res.send(response)
    });
});

router.get("/:name", function (req, res, next) {
    db.getRestaurantAndMeals(req.params.name, req.query["day"]).then(response => {
        res.send(response)
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
