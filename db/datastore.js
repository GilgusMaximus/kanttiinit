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
    const query = datastore.ratings('ratings');
    let [ratings] = await datastore.runQuery(query);
    ratings = ratings.filter(x => x.restaurant === name);

    return ratings.reduce((a, b) => a.rating + b.rating) / ratings.length; // average
}


module.exports = {
    getAllRestaurants,
    getRestaurant,
    getRestaurantRatings
}
