var express = require("express");
var router = express.Router();
let db = require('../db/datastore')
let fb = require('../utils/firebaseAuth')


/* GET all restaurants */
router.get("/", function (req, res, next) {
    db.getRestaurantRating(req.restaurant).then(response => {
        console.log("AVG RATING: ", response, "\n")
        res.send({"rating": response})
    })
});


router.post('/', (req, res, next) => {
    const rest = req.restaurant
    const rating = req.body.rating;

    fb.getUID(req.token).then(uid => {
        db.addRestaurantRating(uid, rest, rating).then(r => {
            if (r === -1) {
                return res.status(400).send({error: "Your rating must be in between 1 and 5."})
            } else if (r === -2) {
                return res.status(400).send({error: "You already added a rating."})
            }
            return res.sendStatus(200)
        })
    })

});


module.exports = router;
