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

const sodexoRests = Object.keys(nameIdDict)

async function getRestaurantData(name, language) {
    const restaurantId = nameIdDict[name];
    const url = `${restaurantUrlWeekly}${restaurantId}`;
    return mapDataToStandard(await makeHTTPSRequest(url), language);
}

function mapDataToStandard(restaurantData, language) {
    // determine monday date as we get start and end of week as string
    const weekStart = createDateFromDotDate(`${restaurantData.data.timeperiod.split('-')[0].trim()}2021`);
    return restaurantData.data.mealdates.map((element, index) => {
        console.log(weekStart.getDate());
        const mealDay = {
            day: element.date,
            date: new Date(),
            menu: []
        }
        mealDay.date.setDate(weekStart.getDate()+index)
        Object.entries(element.courses).forEach(([key, value]) => {
            const mealElement = value;
            mealDay.menu.push({
                Name: mealElement.category,
                Price: mealElement.price,
                Meals: [
                    {
                        Name: (language === 'fi' || mealElement.title_en === "") ? mealElement.title_fi : mealElement.title_en,
                        Diets: ('dietcodes' in mealElement) ? mealElement.dietcodes.split(',').map((dietElement) => dietElement.trim()) : "",
                        Allergens: [] ? mealElement === undefined : mealElement.additionalDietInfo.allergens.split(',').map(element => element.trim()) // TODO: fix if empty
                    }
                ]
            })
        })
        return mealDay
    })
}

module.exports = {
    getRestaurantData,
    sodexoRests,
};
