/*
Scraper for Täffä restaurant
https://about.teknologforeningen.fi/index.php/en/lunch-restaurant
https://about.teknologforeningen.fi/index.php/fi/teekkariravintola
 */

const makeHTTPSRequest = require('./httpRequester');
const htmlParser = require('htmlparser2');
const {createDateFromDotDate} = require('./utils')
const restaurantUrlEn = "https://about.teknologforeningen.fi/index.php/en/lunch-restaurant";
const restaurantUrlFi = "https://about.teknologforeningen.fi/index.php/fi/teekkariravintola";

async function getRestaurantData(language) {
    const url = (language === 'fi') ? restaurantUrlFi : restaurantUrlEn;
    let data = await makeHTTPSRequest(url);
    // Regex needed to extract the required data from the HTML with as little wrapper as possible for the parser
    data = data.data.match(/<div class=\"small-12 medium-3 large-3 small-order-3 medium-order-3 column(.)*<!-- Footer -->/s)[0];
    // Cleanup as the regex does not produce valid HTML for the parser
    data = data.substr(0, data.length - 31);
    return mapDataToStandard(extractDataFromHtml(htmlParser.parseDocument(data).children[0]));
}


function extractDataFromHtml(htmlData) {
    let index = 3;
    let dayMeals = [];
    for (; index < htmlData.children.length; index += 4) {
        // process day
        const date = htmlData.children[index].children[0].data || null;

        // process meals of that day
        const mealIndex = index + 2;
        dayMeals.push({date: date, meals: []});
        htmlData.children[mealIndex].children.forEach((mealTag, counter) => {
            // empty space
            if (counter % 2 === 0) {
                return;
            }
            // actual items
            dayMeals[dayMeals.length - 1].meals.push(mealTag.children[0].data);
        });
    }
    return dayMeals;
}

function mapDataToStandard(restaurantData) {
    const data = restaurantData.map((element, index) => {
        const dayDate = element.date.split(' ')
        const dayMeals = {
            day: dayDate[0],
            date: createDateFromDotDate(dayDate[1]),
            menu: []
        }
        element.meals.forEach((mealElement, mealIndex) => {
            const split = mealElement.split('(')
            const diets = (split.length === 2) ? split[1].substr(0, split[1].length - 1).split(',').map(element => element.trim()) : ""
            dayMeals.menu.push({
                Name: split[0].substr(0, split[0].length - 1),
                Price: (split[0].indexOf('A la Carte') !== -1) ? "5,35/8,50€" : "2,70/6,00€",
                Meals: [{
                    Name: split[0].substr(0, split[0].length - 1),
                    Diets: diets
                }]
            })
        })
        return dayMeals
    })
    return data
}

module.exports = getRestaurantData;
