/*
Scraper for all the Sodexo owned restaurants, as all the HTML pages have to be scraped manually
 */

const makeHTTPSRequest = require('./httpRequester')

const restaurantUrlDaily = "https://www.sodexo.fi/en/ruokalistat/output/daily_json/207/2021-10-25"
const restaurantUrlWeekly = "https://www.sodexo.fi/en/ruokalistat/output/weekly_json/"

const nameIdDict = {
    'valimo': 86,
    'arvo': 207,
    'kvarkki': 86,
    'tietotekniikantalo': 86,
}

async function getRestaurantData(name, language) {
    const restaurantId = nameIdDict[name];
    // TODO decide whether we want to go with the weekly or daily menus?
    const url = `${restaurantUrlWeekly}${restaurantId}`;
    const data = await makeHTTPSRequest(url);
    return data;
}

module.exports = getRestaurantData;