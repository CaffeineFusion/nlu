`use strict`;

const MongoClient = require('mongodb').MongoClient;


module.exports = class Mongo {
    constructor(uri) {
        this.URI = uri;
    }

    insert(documents) {
        MongoClient.connect(this.URI, function(err, db) {
            var col = db.collection('data');
        });
    }
}
