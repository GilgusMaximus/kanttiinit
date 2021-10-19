var express = require("express");
var router = express.Router();


let ratings = [5, 4, 3, 5, 5, 4, 5]

/* GET all restaurants */
router.get("/", function (req, res, next) {
    if (req.query.avg === 'true') {
        avg = ratings.reduce((a, b) => a + b) / ratings.length;
        console.log(avg)
        res.send({
            avg: avg,
            count: ratings.length
        })
    }
    res.send(ratings);
});


router.post('/', (req, res, next) => {
    const rating = req.body.rating;
    ratings.concat(rating)
    console.log(ratings)
});


module.exports = router;
