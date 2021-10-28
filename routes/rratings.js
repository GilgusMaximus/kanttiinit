var express = require("express");
var router = express.Router();
let db = require('../db/datastore')


/* GET all restaurants */
router.get("/", function (req, res, next) {
    db.getRestaurantRatings(req.restaurant).then(response => {
        console.log(response)
        res.send(response)
    })
});


router.post('/', (req, res, next) => {
    const rest = req.restaurant
    const rating = req.body.rating;

    db.addRestaurantRating("admin", rest, rating).then(r => {
        if (r === -1) {
            return res.sendStatus(400)
        }
        return res.sendStatus(200)
    })
});


module.exports = router;
