/*
Scraper for all the Fazer owned restaurants, as the JSON data can be accessed directly via API
 */

const makeHTTPSRequest = require('./httpRequester')

const restaurantURL = "https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=$&weekDate=%"

const nameIdDict = {
    'abloc': 220850,
    'alvari': 178664,
    'dipoli': 163757,
    'tuas': 178677,
}

async function getRestaurantData(name, language) {
    const restaurantId = nameIdDict[name];
    const currentDate = new Date().toISOString().split('T')[0];
    console.log("The date is;", currentDate);
    const url = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
    const data = await makeHTTPSRequest(url);
    return data;
}

module.exports = getRestaurantData;