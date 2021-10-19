var express = require("express");
var router = express.Router();

/* GET all restaurants */
router.get("/", function (req, res, next) {
    res.send("HELLO " + req.restaurant);
});

module.exports = router;
