'use strict' // Chrome support for ES6.

const mongoose = require('mongoose');

/**
 * MongoDB Translator: translator class for MongoDB.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class MongoTranslator {
    constructor(uri) {
        this.uri = uri;
    }

    connect() {
        console.log("Connecting to MongoDB...");
        mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log("MongoDB connected!"))
            .catch(error => {
                console.log("Failed to establish connection with MongoDB.")
                // console.log(error) // Logs entire stack trace; write to a log file in the future.
            });
    }

    // TODO: Add CRUD operations by utilizing Mongo's built in functions...
}

module.exports = MongoTranslator;