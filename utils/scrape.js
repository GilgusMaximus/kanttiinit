const fazer = require('./fazerScraper');
const sodexo = require('./sodexoScraper');
const taffa = require('./taffaScraper');
const maukas = require('./maukasScraper');

const datastore = require('../db/datastore')


// TODO: recreate restaurant entities with their codename as their ID
// TODO: meals AND menus in datastore??

/*
 X remove all entities inside weekly-meals: datastore.clearWeeklyMeals()
    * actually check date because of taffa
 * go through each restaurant
     * X. scrape data
     * X. create entity in the meal archive (if it exists)
         * 1. create menu in weekly meals
         * 2. copy that menu over to the weekly meals
 */

scrapeAllData = () => {
    datastore.clearWeeklyMeals().then(async r => {
        // weekly meals emptied
        console.log(r)
    })

    // go through each restaurant done later. for now only work with one restaurant
    fazer.getRestaurantData('abloc', 'en').then(response => {
        response.sort((a, b) => a.date > b.date ? 1 : -1)
        response.forEach((day) => {
            day.menu.forEach((meal) => {
                console.log(meal)
                // TODO : Menus and Meals, as all meals are under a menu option, see fazer
                datastore.createMeal('Mau-Kas', meal.Name, meal.Diets[0]).then(async r => {
                    // meal created if had not existed beforehand
                    await console.log(r)
                })
            })
        })
    })
}



module.exports = scrapeAllData;
