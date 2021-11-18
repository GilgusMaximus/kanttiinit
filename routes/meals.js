var express = require("express");
var router = express.Router();
var db = require('../db/datastore')
var storage = require('../db/storage')
var isTokenValid = require('../utils/firebaseAuth')
router.use(errorHandler)


/* GET all meals from restaurant for today? */
router.get("/", function (req, res, next) {
    const restaurant = req.restaurant;

    db.getWeeklyMealsDates(restaurant).then((r) => {
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
        if (!r) {
            let err = new Error("Meal couldn't be found.")
            err.code = 400;
            return next(err)
        }
        res.send(r)
    })
})

router.post("/:meal/review/", function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const rating = req.body.rating;

    db.addMealRating("admin", restaurant, meal, rating).then(r => {
        if (!r) {
            let err = new Error("Meal couldn't be found.")
            err.code = 400;
            return next(err)
        }
        res.send(r)
    })
});


/* Upload image to cloud */
router.post("/:meal/image/", storage.multer.single('file'), function (req, res, next) {
    const token = req.headers.auth.split(' ')[1]
    try {
        if(isTokenValid(token)) {
            storage.uploadImage(req, res, next)
        } else {
            res.status(403)
            res.send("Access not allowed, invalid token")
        }
    } catch(error){
        console.log(error)
        res.status(500)
        res.send("Internal server error")
    }
    
});


/* Update corresponding meal entity */
router.post("/:meal/image/", storage.multer.single('file'), function (req, res, next) {
    const restaurant = req.body.name;
    const meal = req.params.meal;
    const url = req.file.cloudStoragePublicUrl;


    db.addMealImage(restaurant, meal, url).then(r => {
        if (!r) {
            let err = new Error("There was a problem with the image upload.")
            err.code = 400;
            return next(err)
        }
        return res.sendStatus(200)
    })
});

function errorHandler(err, req, res, next) {
    let code = err.code;
    let message = err.message;
    res.writeHead(code, message, {'content-type': 'text/plain'});
    res.end(message);
}

module.exports = router;
