const {format} = require('util');
const Multer = require('multer');

// By default, the client will authenticate using the service account file
// specified by the GOOGLE_APPLICATION_CREDENTIALS environment variable and use
// the project specified by the GOOGLE_CLOUD_PROJECT environment variable. See
// https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
// These environment variables are set automatically on Google App Engine
const {Storage} = require('@google-cloud/storage');

// Instantiate a storage client
const storage = new Storage();

const CLOUD_BUCKET = process.env['GCLOUD_STORAGE_BUCKET'];

// A bucket is a container for objects (files).
const bucket = storage.bucket(CLOUD_BUCKET);



function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
function uploadImage(req, res, next) {
    if (!req.file) {
        return next();
    }

    const gcsname = Date.now() + req.file.originalname;
    const file = bucket.file(gcsname);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype,
        },
        resumable: false,
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err;
        next(err);
    });

    stream.on('finish', async () => {
        req.file.cloudStorageObject = gcsname;
        await file.makePublic();
        req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
        next();
    });

    stream.end(req.file.buffer);
}



// Multer is required to process file uploads and make them available via
// req.files.
const multer = Multer({
    storage: Multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
    },
});

module.exports = {
    uploadImage,
    multer
}
