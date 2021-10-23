// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GCLOUD_PROJECT environment variable. See
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/datastore/latest/guides/authentication
const {Datastore} = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore();

module.exports.getAllRestaurants = async() => {
    const query = datastore.createQuery('restaurants');

    const [rests] = await datastore.runQuery(query);
    console.log('Restaurants:');
    rests.forEach(rest => {
        const restKey = rest[datastore.KEY];
        console.log(restKey.id, rest);
    })
}
