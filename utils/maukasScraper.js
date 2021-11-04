/*
Scraper for the Maukas restaurant
 */

const makeHTTPSRequest = require('./httpRequester');
const htmlParser = require('htmlparser2');

const restaurantURL = "https://www.mau-kas.fi/ravintola.html?listtype=lunch&ci=0&showall=true";

async function getRestaurantData(language) {
    const htmlPage = await makeHTTPSRequest(restaurantURL);
    // Regex needed to extract the required data from the HTML with as little wrapper as possible for the parser
    let matchedHtml = htmlPage.data.match(/<div class="restaurant_menulist_menu">.+?(?=<div id="content_bottom">)/s)[0]
    // clean up as the regex result itself is not valid HTML
    matchedHtml = matchedHtml.substr(0, matchedHtml.length-15)
    return mapDataToStandard(extractDataFromHTML(htmlParser.parseDocument(matchedHtml)), language)
}

function extractDataFromHTML(htmlParsed) {
    const mealDays = [];
    for(let i=3; i < htmlParsed.children[0].children.length; i+=4) {

        // extract day
        const dayElement = htmlParsed.children[0].children[i];
        mealDays.push({day: dayElement.children[0].data, meals: []});

        // extract meals per day
        const menuElement = htmlParsed.children[0].children[i+2];
        for(let j=1; j < menuElement.children.length; j+=4) {
            if(menuElement.children[j].children.length > 1) {
                // normal meals
                mealDays[mealDays.length - 1].meals.push(menuElement.children[j].children[2].data);
            } else {
                // when no meals are available (e.g. weekend)
                mealDays[mealDays.length - 1].meals.push(menuElement.children[j].children[0].data);
            }
        }
    }
    return mealDays;
}

function mapDataToStandard(restaurantData, language) {
    const currentDate = new Date();
    return restaurantData.map((element, index) => {
        const dayMeals = {
            day: element.day.split('\n')[1].trim(),
            date: new Date(),
            menu: []
        }
        dayMeals.date.setDate(currentDate.getDate()+(index-currentDate.getDay()+1))
        element.meals.forEach((mealElement, mealIndex) => {
            const mealSplit = mealElement.split('/')
            if(mealSplit.length === 1) {
                const dietSplit = (mealSplit.length > 1) ? mealSplit[1].split(' ' ) : mealSplit[0].split(' ')
                dayMeals.menu.push(
                    {
                        Name: dietSplit.splice(0, dietSplit.length-1-(mealSplit[0].match(/,/g) || []).length).join(' '),
                        Price: "",
                        Meals: [
                            {
                                Name: dietSplit.splice(0, dietSplit.length-1-(mealSplit[0].match(/,/g) || []).length).join(' '),
                                Diets: [dietSplit.splice(dietSplit.length-1-(mealSplit[0].match(/,/g) || []).length)]
                            }
                        ]
                    }
                )
                return
            }
            const dietSplit = (mealSplit.length > 1) ? mealSplit[1].split(' ' ) : mealSplit[0].split(' ')
            const name = (language === 'fi') ? mealSplit[0].split(' ') : dietSplit.splice(0, dietSplit.length-1-(mealSplit[1].match(/,/g) || []).length)
            dayMeals.menu.push(
                {
                    Name: name.join(' '),
                    Price: -1,
                    menu: [{
                        Name: name.join(' '),
                        Diets: [dietSplit.splice(dietSplit.length-1-(mealSplit[1].match(/,/g) || []).length)]
                    }]
                }
            )
        })
        return dayMeals
    })
}
module.exports = getRestaurantData;
