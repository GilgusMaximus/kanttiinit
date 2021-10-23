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
    // If we index fields:
    // const query = datastore.createQuery('restaurants').filter('name', '=', 'Mau-kas')
    // const [rests] = await datastore.runQuery(query);
    // return rests

    const query = datastore.createQuery('restaurants');
    const [rests] = await datastore.runQuery(query);
    return rests.find(x => x.name.toLowerCase() === name.toLowerCase());
}

// we don't have ratings yet, so this wouldn't work yet
getRestaurantRatings = async (name) => {
    const query = datastore.createQuery('rrating');
    let [ratings] = await datastore.runQuery(query);
    for (let i = 0; i < ratings.length; i++) {
        ratings[i] = ratings[i].rating
    }
    return ratings.map(x => x[0]);
}

addRestaurantRating = async (name, rating) => {
    return 5
}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantRatings,
    addRestaurantRating
}
