// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
const {Datastore} = require('@google-cloud/datastore');

const datastore = new Datastore();

const mealArchiveKind = 'meals';
const mealWeeklyKind = 'meals-weekly'
const restKind = 'restaurants'

const getAllRestaurants = async () => {
    const query = datastore.createQuery(restKind);
    const [rests] = await datastore.runQuery(query);
    return rests
}

const getRestaurant = async (name) => {
    return await getAllRestaurants().then(rests => {
        return rests.find(x => x.name.toLowerCase() === name.toLowerCase());
    })
}

// we don't have ratings yet, so this wouldn't work yet
const getRestaurantRatings = async (name) => {
    return await getRestaurant(name).then(rest => {
        return rest.rating
    })
}

const addRestaurantRating = async (creator, rest, ratingNumber) => {
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

const getAllMealsRestaurant = async (restaurant) => {
    const query = datastore.createQuery(mealArchiveKind);
    let [meals] = await datastore.runQuery(query);
    return meals.filter(x => x.restaurant.toLowerCase() === restaurant.toLowerCase())
}

// returns either meal if existing or undefined if not existing
const getMealExisting = async (restaurant, mealName) => {
    return await getAllMealsRestaurant(restaurant).then(meals => {
        return meals.find(x => x.name.toLowerCase() === mealName.toLowerCase())
    })
}


const copyMealWeekly = async (mealEntity, date) => {
    const key = datastore.key(mealWeeklyKind)
    const meal = {
        'name': mealEntity.name,
        'restaurant': mealEntity.restaurant,
        'allergies': mealEntity.allergies,
        'rating': mealEntity.rating,
        'url': mealEntity.url,
        'date': date,
    }

    datastore.insert({key: key, data: meal}).then(r => {
        // inserted successfully
    })
}


const copyMealsWeekly = async (mealEntities) => {
}

const getWeeklyMeals = async () => {
    const query = datastore.createQuery(mealWeeklyKind);
    const [meals] = await datastore.runQuery(query);
    return meals
}

const clearWeeklyMeals = async () => {
    await getWeeklyMeals().then(async r => {
        let keys = r.map(x => x[datastore.KEY])
        await datastore.delete(keys)
    })
}


// used for scraper
const createMeal = async (restaurant, mealName, allergies) => {
    let m = await getMealExisting(restaurant, mealName).then(r => {
        return r
    })

    // TODO: check if meal exists first
    if (m) { // meal already exists
        console.log("------- MEAL ALREAY EXISTS -----------------", m.name)
        return m
    }

    const key = datastore.key(mealArchiveKind);
    const meal = {
        'name': mealName,
        'restaurant': restaurant,
        'allergies': allergies,
        'rating': [],
        'url': [],
    }

    return datastore.insert({key: key, data: meal}).then(async m => {
        const [entity] = await datastore.get(key)
        return entity
    })
}


/* Copied code over from add restaurant rating. First finalize that method, before working on this one */
const addMealRating = async (creator, restaurant, mealName, ratingNumber) => {
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

//TODO: add to both meal kind and meal archive kind
const addMealImage = async (restaurant, mealName, url, kind = mealArchiveKind) => {
    const query = datastore.createQuery(kind);
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
    clearWeeklyMeals,
    getWeeklyMeals,
}
