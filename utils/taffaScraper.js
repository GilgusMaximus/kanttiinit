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

const noFoodAvailableEn = "Closed"
const noFoodAvailableFi = "Suljettu"

async function getRestaurantData(language) {
    const url = (language === 'fi') ? restaurantUrlFi : restaurantUrlEn;
    const htmlData = await makeHTTPSRequest(url);
    // Regex needed to extract the required data from the HTML with as little wrapper as possible for the parser
    const matchedHtml = htmlData.data.match(/<div class=\"small-12 medium-3 large-3 small-order-3 medium-order-3 column(.)*<!-- Footer -->/s)[0];
    // Cleanup as the regex does not produce valid HTML for the parser
    const validHtmlMatch = matchedHtml.substr(0, matchedHtml.length - 31);
    return mapDataToStandard(extractDataFromHtml(htmlParser.parseDocument(validHtmlMatch).children[0]), language);
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
            if(mealTag.children.length > 0) {
                dayMeals[dayMeals.length - 1].meals.push(mealTag.children[0].data);
            }
        });
    }
    return dayMeals;
}

function mapDataToStandard(restaurantData, language) {
    const mealWeek = restaurantData.map((element, index) => {
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

    // required to make the array 7 days long and cover saturday and sunday as well
    // -> makes upstream work easier as there will be no need to distinguish between the restaurants1
    for(let i = 0; i < mealWeek.length; i++) {
        console.log(mealWeek[i].date.getDay())
        if(mealWeek[i].date.getDay() === 5) {
            const currentDate = new Date();
            const saturday = {
                day: (language === 'fi') ? 'Lauantai' : 'Saturday',
                date: new Date(currentDate.setDate(mealWeek[i].date.getDate()+1)),
                menu: [
                    {
                        Name: (language === 'fi') ? noFoodAvailableFi : noFoodAvailableEn,
                        Price: "",
                        Meals: []
                    }
                ]
            }
            const sunday = {
                day: (language === 'fi') ? 'Sunnuntai' : 'Sunday',
                date: new Date(currentDate.setDate(mealWeek[i].date.getDate()+2)),
                menu: [
                    {
                        Name: (language === 'fi') ? noFoodAvailableFi : noFoodAvailableEn,
                        Price: "",
                        Meals: []
                    }
                ]
            }
            mealWeek.splice(i+1, 0, saturday)
            mealWeek.splice(i+2, 0, sunday)
            break
        }
    }
    return mealWeek
}

module.exports = getRestaurantData;
