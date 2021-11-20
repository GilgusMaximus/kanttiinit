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

scrapeAllData = async () => {
    // await datastore.clearWeeklyMeals().then(async () => {
    //     await console.log(" ---------- MEALS EMPTIED ------------- ")
    // })
    // createMaukasMeals()
    // createTaffaMeals()
    // createFazerMeals()
    // createSodexoMeals()
}

const createRestaurantMeals = (restaurantName, scrapeFunc) => {
    // go through each restaurant done later. for now only work with one restaurant
    scrapeFunc.then(response => {
        response.sort((a, b) => a.date > b.date ? 1 : -1)
        response.forEach((day) => {
            day.menu.forEach((menu) => {
                if (!menu.Meals) {
                    menu.menu.forEach(async (meal) => {
                        await datastore.createMeal(restaurantName, meal.Name, meal.Diets, menu.Name).then(async r => {
                            await datastore.copyMealWeekly(r, day.date, menu.Name).then(async m => {

                            })
                        })
                    })
                }
                else {
                    menu.Meals.forEach(async (meal) => {
                            await datastore.createMeal(restaurantName, meal.Name, meal.Diets, menu.Name).then(async r => {
                                await datastore.copyMealWeekly(r, day.date, menu.Name).then(async m => {

                                })
                            })
                        }
                    )
                }
            })
        })
    })
}


const createFazerMeal = (restaurantName, scrapeFunc) => {
    // go through each restaurant done later. for now only work with one restaurant
    scrapeFunc.then(response => {
        response.sort((a, b) => a.date > b.date ? 1 : -1)
        response.forEach((day) => {
            day.menu.forEach((menu, i) => {
                menu.Meals.forEach(async (m) => {
                    await datastore.createMeal(restaurantName, m.Name, m.Diets).then(async r => {
                        let category = menu.Name || `Lunch ${i+1}`
                        await datastore.copyMealWeekly(r, day.date, category).then(async response => {

                        })
                    })
                })
            })
        })
    })
}

const createMaukasMeals = () => {
    createRestaurantMeals('Mau-kas', maukas('en'))
}

const createTaffaMeals = () => {
    createRestaurantMeals("Täffä", taffa('en'))
}

const createFazerMeals = () => {
    // fazer.fazerRests.forEach(name => createRestaurantMeals('Mau-Kas', fazer.getRestaurantData(name, 'en')))
    createFazerMeal('A Bloc', fazer.getRestaurantData('abloc', 'en'))
    createFazerMeal('Alvari', fazer.getRestaurantData('alvari', 'en'))
    createFazerMeal('Dipoli Reima', fazer.getRestaurantData('dipoli', 'en'))
    createFazerMeal('TUAS', fazer.getRestaurantData('tuas', 'en'))
}

const createSodexoMeals = () => {
    // sodexo.sodexoRests.forEach(name => createRestaurantMeals('Mau-Kas', fazer.getRestaurantData(name, 'en')))
    createRestaurantMeals('Arvo', sodexo.getRestaurantData('arvo', 'en'))
    createRestaurantMeals('Aalto Valimo', sodexo.getRestaurantData('valimo', 'en'))
    createRestaurantMeals('Kvarkki', sodexo.getRestaurantData('kvarkki', 'en'))
    createRestaurantMeals('Computer Science Building', sodexo.getRestaurantData('tietotekniikantalo', 'en'))
}

module.exports = scrapeAllData;
