var express = require("express");
var router = express.Router();
let db = require('../db/datastore')


let ratings = [5, 4, 3, 5, 5, 4, 5]

/* GET all restaurants */
router.get("/", function (req, res, next) {
    db.getRestaurantRatings(req.params.name).then(response => {
        if (response !== undefined) {
            res.send(response)
        }
    })
});


router.post('/', (req, res, next) => {
    const rest = req.body.name;
    const rating = req.body.rating;

    db.addRestaurantRating(rest, rating).then(r =>
        console.log(r)
    )
});


module.exports = router;
