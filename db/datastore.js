// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

getAllRestaurants = async () => {
    const query = datastore.createQuery('restaurants');
    const [rests] = await datastore.runQuery(query);
    return rests
}

getRestaurant = async (name) => {
    const query = datastore.createQuery('restaurants');
    const [rests] = await datastore.runQuery(query);
    return rests.find(x => x.name.toLowerCase() === name.toLowerCase());
}

// we don't have ratings yet, so this wouldn't work yet
getRestaurantRatings = async (name) => {
    const query = datastore.createQuery('restaurants');
    let [ratings] = await datastore.runQuery(query);
    let rating = ratings.find(x => x.name.toLowerCase() === name.toLowerCase()) // only get specific restaurant

    return rating.rating
}

addRestaurantRating = async (creator, rest, rating) => {
    // TODO: check that name wasn't already added
    if (rating < 1 || rating > 5) {
        return -1
    }
    const query = datastore.createQuery('restaurants');
    let [ratings] = await datastore.runQuery(query);
    let rat = ratings.find(x => x.name.toLowerCase() === rest.toLowerCase())
    let key = rat[datastore.KEY]
    rat.rating.push(
        {
            "rating": rating,
            "creatorId": creator,
            "timestamp": Date.now(),
        }
    )
    await datastore.update({key: key, data: rat})
    return rating
}

getMeal = async (restaurant, meal) => {

}

addMealRating = async (restaurant, meal, rating) => {

}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantRatings,
    addRestaurantRating,
    addMealRating,
    getMeal
}


/*
 * Datastore does not support images. Instead use cloud store and have a url field in meal entity?
 *
 * rrating array vs. rrating entities?
     * Could we also put the restaurant reviews in the restaurant entity?
         *  or would that be too big? (creator, date, rating)

 *
 * how do we create meal ids?
 *
 *
 *
 * Menu Parser is high priority, s.t. we get some data to work with. When shall we work on that?
 */
