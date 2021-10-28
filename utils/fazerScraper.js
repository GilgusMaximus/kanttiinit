/*
Scraper for all the Fazer owned restaurants, as the JSON data can be accessed directly via API
 */

const makeHTTPSRequest = require('./httpRequester')
const { createDateFromDotDate } = require('./utils')

const nameIdDict = {
    'abloc': 220850,
    'alvari': 178664,
    'dipoli': 163757,
    'tuas': 178677,
}

async function getRestaurantData(name, language) {
    const restaurantId = nameIdDict[name];
    const currentDate = new Date().toISOString().split('T')[0];
    const url = `https://www.foodandco.fi/api/restaurant/menu/week?language=${language}&restaurantPageId=${restaurantId}&weekDate=${currentDate}`;
    const htmlData = await makeHTTPSRequest(url);
    const weekMeals = htmlData.data.LunchMenus.map((element, index) => {
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
    getRestaurantData
};
