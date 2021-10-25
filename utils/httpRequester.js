const axios = require('axios');

async function makeHTTPSRequest(url) {
    return axios.get(url);
}

module.exports = makeHTTPSRequest;