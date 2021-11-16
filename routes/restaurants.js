var express = require("express");
var router = express.Router();

var mealRouter = require('./meals');
var rratingRouter = require('./rratings');

const db = require('../db/datastore');


/* GET all restaurants and res meals */
router.get("/", function (req, res, next) {
    db.getAllRestaurantsAndMeals(req.query["day"]).then(response => {
        for (let j = 0; j < response.length; j++) {
            restaurant = response[j]
            categories = {}
            if (!restaurant.meals) {
                console.log("continuing")
                continue;
            }
            for (let i = 0; i < restaurant.meals.length || 0; i++) {
                let meal = restaurant.meals[i]
                if (meal.category in categories) {
                    categories[meal.category].push(meal)
                } else {
                    categories[meal.category] = [meal]
                }
            }
            console.log(categories)
            restaurant.meals = categories
        }
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
