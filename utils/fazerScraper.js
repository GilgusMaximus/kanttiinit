/*
Scraper for all the Fazer owned restaurants, as the JSON data can be accessed directly via API
 */

const makeHTTPSRequest = require('./httpRequester')
const {createDateFromDotDate} = require('./utils')
const restaurantURL = "https://www.foodandco.fi/api/restaurant/menu/week?language=fi&restaurantPageId=$&weekDate=%"

const nameIdDict = {
    'abloc': 220850,
    'alvari': 178664,
    'dipoli': 163757,
    'tuas': 178677,
}

const fazerRest = Object.keys(nameIdDict)

async function getRestaurantData(name, language) {
    const restaurantId = nameIdDict[name];
    const currentDate = new Date().toISOString().split('T')[0];
    console.log("The date is;", currentDate);
    const url = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
    const data = await makeHTTPSRequest(url);
    const weekMeals = data.data.LunchMenus.map((element, index) => {
        // required to get the date into the JS native date format, which allows easier processing

        return {
            day: element["DayOfWeek"],
            date: createDateFromDotDate(element["Date"]),
            menu: element["SetMenus"]
        }
    });
    return weekMeals;
}

module.exports = {
    getRestaurantData,
    fazerRest,
};
