/*
Scraper for the Maukas restaurant
 */

const makeHTTPSRequest = require('./httpRequester');
const htmlParser = require('htmlparser2');

const restaurantURL = "https://www.mau-kas.fi/ravintola.html?listtype=lunch&ci=0&showall=true";

async function getRestaurantData(language) {
    const htmlPage = await makeHTTPSRequest(restaurantURL);
    let data = htmlPage.data.match(/<div class="restaurant_menulist_menu">.+?(?=<div id="content_bottom">)/s)[0]
    data = data.substr(0, data.length-15)
    // TODO take care of language
    data = extractDataFromHTML(htmlParser.parseDocument(data))
    return data
}

function extractDataFromHTML(htmlParsed) {
    const mealDays = [];
    for(let i=3; i < htmlParsed.children[0].children.length; i+=4) {
        const dayElement = htmlParsed.children[0].children[i];
        mealDays.push({day: dayElement.children[0].data, meals: []});
        const menuElement = htmlParsed.children[0].children[i+2];
        for(let j=1; j < menuElement.children.length; j+=4) {
            if(menuElement.children[j].children.length > 1) {
                mealDays[mealDays.length - 1].meals.push(menuElement.children[j].children[2].data);
            } else {
                mealDays[mealDays.length - 1].meals.push(menuElement.children[j].children[0].data);
            }
        }
    }
    return mealDays;
}
module.exports = getRestaurantData;
