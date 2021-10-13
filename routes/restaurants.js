var express = require('express');
var router = express.Router();

/* restaurants:

id: int
name: string
location: string
pricing: int
url: string
*/

let restaurants = [
    {
    "id": 0,
    "name": "dipoli",
    "location": "aaaaaa",
    "pricing": 1,
    url: "dipoli.com"
    },
    {
    "id": 1,
    "name": "abloc",
    "location": "bbbbbbb",
    "pricing": 1,
    url: "abloc.com"
    },
    {
    "id": 2,
    "name": "täffä",
    "location": "cccc",
    "pricing": 1,
    url: "taffa.com"
    },
    {
    "id": 3,
    "name": "Computer Science Building",
    "location": "dddd",
    "pricing": 1,
    url: "csbuilding.com"
    },
]


/* GET all restaurants */
router.get('/', function(req, res, next) {
  res.send(restaurants);
});


router.get('/:name', function(req, res, next) {
  res.send('restaurant with name ' + req.params.name)
});


module.exports = router;