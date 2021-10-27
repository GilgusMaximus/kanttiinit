/*
Scraper for all the Sodexo owned restaurants, as all the HTML pages have to be scraped manually
 */

const makeHTTPSRequest = require('./httpRequester')
const { createDateFromDotDate } = require('./utils')

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
    const weekStart = createDateFromDotDate(data.data.timeperiod.split('-')[0].trim()+"2021");
    const weekMelas = data.data.mealdates.map((element, index) => {
        const data = {
            day: element.date,
            date: new Date(weekStart.getDate()+index),
            menu: []
        }
        Object.entries(element.courses).forEach(([key, value]) => {
            const mealElement = value;
            data.menu.push({
                Name: (language === 'fi') ? mealElement.title_fi : mealElement.title_en,
                Price: mealElement.price,
                Meals: [
                    {
                        Name: (language === 'fi') ? mealElement.title_fi : mealElement.title_en,
                        Diets: ('dietcodes' in mealElement) ? mealElement.dietcodes.split(',').map((dietElement) => dietElement.trim()) : "",
                        Allergens: mealElement.additionalDietInfo.allergens.split(',').map(element => element.trim())
                    }
                ]
            })
        })
        return data
    })
    return weekMelas;
}

module.exports = getRestaurantData;