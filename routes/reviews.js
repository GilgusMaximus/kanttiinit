var express = require('express');
var router = express.Router();


/* GET all restaurant reviews listing. */
router.get('/restaurant/', function(req, res, next) {
    
});


/* GET all reviews for a certain restaurant */
router.get('/restaurant/name:', function(req, res, next) {
  res.send("res review: " + req.params.name) 
});


/* GET all reviews for a certain mealid */
router.get('/meal/id:', function(req, res, next) {
  res.send("meal review: " + req.params.id) 
});


router.post("/restaurant/", (req, res, next) => {
    const rating = req.body.review.rating;
    if (rating > 0 && rating < 6) {
      // insert rating 
    } else {
        return res.sendStatus(400);
    }
});

router.post("/meal/", (req, res, next) => {
    const rating = req.body.review.rating;
    if (rating > 0 && rating < 6) {
      // insert rating 
    } else {
        return res.sendStatus(400);
    }
});


module.exports = router;
