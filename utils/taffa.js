
/*
Scraper for Täffä restaurant
https://about.teknologforeningen.fi/index.php/en/lunch-restaurant
https://about.teknologforeningen.fi/index.php/fi/teekkariravintola
 */

const makeHTTPSRequest = require('./httpRequester');
const htmlParser = require('htmlparser2');
const restaurantUrlEn = "https://about.teknologforeningen.fi/index.php/en/lunch-restaurant";
const restaurantUrlFi = "https://about.teknologforeningen.fi/index.php/fi/teekkariravintola";

async function getRestaurantData(language) {
    const url = (language === 'fi') ? restaurantUrlFi : restaurantUrlEn;
    let data = await makeHTTPSRequest(url);
    // Regex needed to extract the required data from the HTML with as little wrapper as possible for the parser
    data = data.data.match(/<div class=\"small-12 medium-3 large-3 small-order-3 medium-order-3 column(.)*<!-- Footer -->/s)[0];
    // Cleanup as the regex does not produce valid HTML for the parser
    data = data.substr(0, data.length-31);
    return extractDataFromHtml(htmlParser.parseDocument(data).children[0]);
}


function extractDataFromHtml(htmlData) {
    let index = 3;
    let dayMeals = [];
    for(; index < htmlData.children.length; index += 4) {
        // process day
        const date = htmlData.children[index].children[0].data || null;

        // process meals of that day
        const mealIndex = index+2;
        dayMeals.push({date: date, meals: []});
        htmlData.children[mealIndex].children.forEach((mealTag, counter) => {
            // empty space
            if(counter % 2 === 0) {
                return;
            }
            // actual items
            dayMeals[dayMeals.length-1].meals.push(mealTag.children[0].data);
        });
    }
    return dayMeals;
}

module.exports = getRestaurantData;