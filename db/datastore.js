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
    const newRests = rests.map(restaurant => ({...restaurant, id: restaurant[datastore.KEY].name}))
    return newRests
}

const getRestaurant = async (name) => {
    return await getAllRestaurants().then(rests => {
        return rests.find(x => x.name.toLowerCase() === name.toLowerCase());
    })
}

const getAllRestaurantsAndMeals = async (date) => {
    return await getAllRestaurants().then(async rests => {
        rests.forEach(x => x["meals"] = [])
        if (date) {
            return await getWeeklyMealsDate(date).then(meals => {
                let obj = {}
                meals.forEach(meal => {
                    if (meal.restaurant in obj) {
                        obj[meal.restaurant].push(meal)
                    } else {
                        obj[meal.restaurant] = [meal]
                    }
                })
                rests.forEach(r => r["meals"] = obj[r.name])
                return rests
            })
        } else {
            // use today as date if no argument was given
            return await getWeeklyMealsDate(dateFormat(new Date(2021, 10, 19))).then(meals => {
                let obj = {}
                meals.forEach(meal => {
                    if (meal.restaurant in obj) {
                        obj[meal.restaurant].push(meal)
                    } else {
                        obj[meal.restaurant] = [meal]
                    }
                })
                rests.forEach(r => r["meals"] = obj[r.name])
                return rests
            })
        }
    })
}

const getRestaurantAndMeals = async (name, date) => {
    return await getRestaurant(name).then(async rest => {
        if (date) {
            return await getWeeklyMealsDateRestaurant(date, name).then(meals => {
                rest['meals'] = meals
                return rest
            })
        } else {
            return await getWeeklyMealsRestaurant(name).then(meals => {
                rest['meals'] = meals
                return rest
            })
        }
    })
}

// we don't have ratings yet, so this wouldn't work yet
const getRestaurantRatings = async (name) => {
    return await getRestaurant(name).then(rest => {
        return rest.rating

    })
}

const getRestaurantRating = async (name) => {
    return await getRestaurantRatings(name).then(response => {
        let avgRating = 0
        let length = response.length;
        for(let i = 0; i < length; i++) {
            avgRating += parseFloat(response[i].rating/length)
        }
        return avgRating
    })
}

const addRestaurantRating = async (creator, rest, ratingNumber) => {
    // TODO: check that name wasn't already added
    if (ratingNumber < 1 || ratingNumber > 5) {
        console.log("Rating needs to be between 1 and 5")
        return -1
    }
    const query = datastore.createQuery(restKind);
    let [ratings] = await datastore.runQuery(query);
    let rat = ratings.find(x => x.name.toLowerCase() === rest.toLowerCase())
    let key = rat[datastore.KEY]

    let find = rat.rating.find(x => x.creatorId === creator)
    if (find) { // user already added rating
        console.log("User already added a rating")
        return -2
    }

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

const getWeeklyMealsDate = async (date) => {
    return await getWeeklyMeals().then(response => {
        response.forEach(r => {
            console.log(dateFormat(r.date), r.date, r.restaurant, date, dateFormat(r.date) === date)
        })
        let a = response.filter(m => dateFormat(m.date) === date)
        return a
    })
}

const dateFormat = (date) => {
    date.setHours(12)
    const day = date.getDate();
    const month = date.getMonth() + 1; // getUTCMonth() returns month from 0 to 11
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
}

const getWeeklyMealsDateRestaurant = async (date, restaurant) => {
    return await getWeeklyMealsRestaurant(restaurant).then(response => {
        return response.filter(m => dateFormat(m.date) === date)
    })
}

const getWeeklyMealsRestaurant = async (restaurant) => {
    const query = datastore.createQuery(mealWeeklyKind);
    let [meals] = await datastore.runQuery(query);
    return meals.filter(x => x.restaurant.toLowerCase() === restaurant.toLowerCase())
}

const getWeeklyMealsDates = async (restaurant) => {
    return await getWeeklyMealsRestaurant(restaurant).then(meals => {
        let obj = {}
        meals.forEach(meal => {
            if (meal.date in obj) {
                obj[meal.date].push(meal)
            } else {
                obj[meal.date] = [meal]
            }
        })
        let arr = Object.values(obj)
        arr.sort((a, b) => a[0].date > b[0].date ? 1 : -1)
        return arr
    })

}

const getMenuExisting = async (restaurant, menu) => {
    return await getAllMealsRestaurant(restaurant).then(meals => {
        // return meals.find(x => x.name.toLowerCase() === mealName.toLowerCase() && x.restaurant.toLowerCase() === restaurant.toLowerCase())
    })
}

// returns either meal if existing or undefined if not existing
const getMealExisting = async (restaurant, mealName) => {
    return await getAllMealsRestaurant(restaurant).then(meals => {
        return meals.find(x => x.name.toLowerCase() === mealName.toLowerCase() && x.restaurant.toLowerCase() === restaurant.toLowerCase())
    })
}


const copyMealWeekly = async (mealEntity, date, category) => {
    const key = datastore.key(mealWeeklyKind)
    const meal = {
        'name': mealEntity.name,
        'restaurant': mealEntity.restaurant,
        'allergies': mealEntity.allergies,
        'rating': mealEntity.rating,
        'url': mealEntity.url,
        'category': category,
        'date': date,
    }

    datastore.insert({key: key, data: meal}).then(r => {
        // inserted successfully
    })
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


const createMenu = async (restaurant, menu) => {
    let m = await getMenuExisting(restaurant, menu)

    if (m) { // menu already exists
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

    console.log("Adding new meal: ", mealName)

    return datastore.insert({key: key, data: meal}).then(async m => {
        const [entity] = await datastore.get(key)
        return entity
    })
}


// used for scraper
const createMeal = async (restaurant, mealName, allergies) => {
    let m = await getMealExisting(restaurant, mealName).then(r => {
        return r
    })

    // TODO: check if meal exists first
    if (m) { // meal already exists
        console.log("Meal already exists: ", m.name)
        return m
    }

    const key = datastore.key(mealArchiveKind);

    if (allergies.length > 0) { // fix allergies bug
        if (Array.isArray(allergies[0])) {
            allergies = allergies[0]
        }
    }
    const meal = {
        'name': mealName,
        'restaurant': restaurant,
        'allergies': allergies,
        'rating': [],
        'url': [],
    }

    // console.log("Adding new meal: ", mealName)
    console.log("Adding new meal: ", mealName)

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
const addMealImage = async (restaurant, mealName, url, kind = mealWeeklyKind) => {
    let query = datastore.createQuery(mealWeeklyKind);
    let [meals] = await datastore.runQuery(query);
    let meal = meals.find(x => x.name.toLowerCase() === mealName.toLowerCase() && x.restaurant.toLowerCase() === restaurant.toLowerCase())
    let key = meal[datastore.KEY]
    meal.url.push(url)
    await datastore.update({key: key, data: meal})


    const query2 = datastore.createQuery(mealArchiveKind);
    let [meals2] = await datastore.runQuery(query2);
    let meal2 = meals2.find(x => x.name.toLowerCase() === mealName.toLowerCase() && x.restaurant.toLowerCase() === restaurant.toLowerCase())
    let key2 = meal2[datastore.KEY]
    meal2.url.push(url)
    await datastore.update({key: key2, data: meal2})

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
    getWeeklyMealsRestaurant,
    getWeeklyMealsDates,
    getRestaurantAndMeals,
    getAllRestaurantsAndMeals,
    getWeeklyMealsDate,
    getWeeklyMealsDateRestaurant,
    getRestaurantRating,
}
