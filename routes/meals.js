var express = require("express");
var router = express.Router();


let meals = [
    {
        id: 0,
        name: "Kebab Casserole",
        type: "Lunch 1",
        diets: [
            "Vegan", "Lactose-free", "Gluten-free"
        ],
        image: "https://assets.bonappetit.com/photos/5d977e513b30f40008a4785e/1:1/w_1968,h_1968,c_limit/Basically-Hammy-Chickpea-Soup.jpg"
    },
    {
        id: 1,
        name: "Whole Grain Rice",
        type: "Side",
        diets: [
            "Vegan", "Lactose-free", "Gluten-free"
        ],
        image: "https://assets.bonappetit.com/photos/5d977e513b30f40008a4785e/1:1/w_1968,h_1968,c_limit/Basically-Hammy-Chickpea-Soup.jpg"
    },
    {
        id: 2,
        name: "Chicken with Curry",
        type: "Lunch 2",
        diets: [
            "Meat", "Lactose",
        ],
        image: "https://assets.bonappetit.com/photos/5d977e513b30f40008a4785e/1:1/w_1968,h_1968,c_limit/Basically-Hammy-Chickpea-Soup.jpg"
    },
    {
        id: 3,
        name: "Chickpea Soup",
        type: "Lunch 3",
        diets: [
            "Vegan", "Lactose-free"
        ],
        image: "https://assets.bonappetit.com/photos/5d977e513b30f40008a4785e/1:1/w_1968,h_1968,c_limit/Basically-Hammy-Chickpea-Soup.jpg"
    },
]

/* GET all restaurants */
router.get("/", function (req, res, next) {
    res.send(meals);
});

module.exports = router;
