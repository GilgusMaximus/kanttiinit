// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();
const mealArchiveKind = 'meals';
const mealWeeklyKind = 'meals-weekly'
const restKind = 'restaurants'

getAllRestaurants = async () => {
    const query = datastore.createQuery(restKind);
    const [rests] = await datastore.runQuery(query);
    return rests
}

getRestaurant = async (name) => {
    const query = datastore.createQuery(restKind);
    const [rests] = await datastore.runQuery(query);
    return rests.find(x => x.name.toLowerCase() === name.toLowerCase());
}

// we don't have ratings yet, so this wouldn't work yet
getRestaurantRatings = async (name) => {
    const query = datastore.createQuery(restKind);
    let [ratings] = await datastore.runQuery(query);
    let rating = ratings.find(x => x.name.toLowerCase() === name.toLowerCase()) // only get specific restaurant

    return rating.rating
}

addRestaurantRating = async (creator, rest, ratingNumber) => {
    // TODO: check that name wasn't already added
    if (ratingNumber < 1 || ratingNumber > 5) {
        return -1
    }
    const query = datastore.createQuery(restKind);
    let [ratings] = await datastore.runQuery(query);
    let rat = ratings.find(x => x.name.toLowerCase() === rest.toLowerCase())
    let key = rat[datastore.KEY]
    rat.rating.push(
        {
            "rating": ratingNumber,
            "creatorId": creator,
            "timestamp": Date.now(),
        }
    )
    await datastore.update({key: key, data: rat})
    return ratingNumber
}

getAllMealsRestaurant = async (restaurant) => {
    const query = datastore.createQuery(mealArchiveKind);
    let [meals] = await datastore.runQuery(query);
    return meals.filter(x => x.restaurant.toLowerCase() === restaurant.toLowerCase())
}

// returns either meal if existing or undefined if not existing
getMealExisting = async (restaurant, mealName) => {
    const query = datastore.createQuery(mealArchiveKind);
    let [meals] = await datastore.runQuery(query);
    return meals.filter(x => x.restaurant.toLowerCase() === restaurant.toLowerCase()).find(x => x.name.toLowerCase() === mealName.toLowerCase())
}


copyMealWeekly = async (mealEntity) => {
    const key = datastore.key(mealWeeklyKind)
    const meal = {
        'name': mealEntity.name,
        'restaurant': mealEntity.restaurant,
        'allergies': mealEntity.allergies,
        'rating': mealEntity.rating,
        'url': mealEntity.url,
        'date': mealEntity.date,
    }

    datastore.insert({key: key, data: meal}).then(r => {
        // inserted successfully
    })
}


copyMealsWeekly = async (mealEntities) => {
}


// used for scraper
createMeal = async (restaurant, mealName, allergies) => {
    // TODO: check if meal exists first
    const key = datastore.key(mealArchiveKind);
    const meal = {
        'name': mealName,
        'restaurant': restaurant,
        'allergies': allergies,
        'rating': [],
        'url': [],
    }

    datastore.insert({key: key, data: meal}).then(() => {
        // Meal inserted successfully.
    })
}


/* Copied code over from add restaurant rating. First finalize that method, before working on this one */
addMealRating = async (creator, restaurant, mealName, ratingNumber) => {
    // // TODO: check that name wasn't already added
    // if (ratingNumber < 1 || ratingNumber > 5) {
    //     return -1
    // }
    // const query = datastore.createQuery('meals');
    // let [meals] = await datastore.runQuery(query);
    // let meal = meals.find(x => x.name.toLowerCase() === mealName.toLowerCase())
    // let key = meal[datastore.KEY]
    // meal.rating.push(
    //     {
    //         "rating": ratingNumber,
    //         "creatorId": creator,
    //         "timestamp": Date.now(),
    //     }
    // )
    // await datastore.update({key: key, data: meal})
    // return ratingNumber
}

addMealImage = async (restaurant, mealName, url) => {
    const query = datastore.createQuery(mealArchiveKind);
    let [meals] = await datastore.runQuery(query);
    let meal = meals.find(x => x.name.toLowerCase() === mealName.toLowerCase())
    let key = meal[datastore.KEY]
    meal.url.push(url)

    await datastore.update({key: key, data: meal})
    return url
}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantRatings,
    addRestaurantRating,
    addMealRating,
    addMealImage,
    getMealExisting,
    createMeal,
    getAllMealsRestaurant,
    copyMealWeekly,
}
