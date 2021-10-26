var express = require("express");
var router = express.Router();

var db = require('../db/datastore')
var storage = require('../db/storage')

/* GET all meals from restaurant for today? */
router.get("/", function (req, res, next) {
    const restaurant = req.restaurant;

    db.getAllMealsRestaurant(restaurant).then((r) => {
        res.send(r)
    })
});

/**
 * DB relies on meal parsing to add foods to the datastore. This should be implemented somewhere here.
 */

router.get("/:meal/", function (req, res, next) {
    const restaurant = req.restaurant;
    const meal = req.params.meal;

    db.getMealExisting(restaurant, meal).then(r => {
        res.send(r)
    })
})

router.post("/:meal/review/", function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const rating = req.body.rating;

    db.addMealRating("admin", restaurant, meal, rating).then(r => {
        res.send(r)
    })
});


/* Upload image to cloud */
router.post("/:meal/image/", storage.multer.single('file'), function (req, res, next) {
    storage.uploadImage(req, res, next)
});


/* Update corresponding meal entity */
router.post("/:meal/image/", storage.multer.single('file'), function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const url = req.file.cloudStoragePublicUrl;


    db.addMealImage(restaurant, meal, url).then(r => {
        return res.sendStatus(200)
    })
});

// TODO: update error middleware
router.use("/:meal/image/", function (err, req, res, next) {
    console.log("Image was invalid or not provided")
    res.status(err.status || 500).send(err.message)
})

module.exports = router;
