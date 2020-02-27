'use strict' // Chrome support for ES6.

const mongoose = require('mongoose');

/**
 * MongoDB Translator: translator class for MongoDB.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class MongoTranslator {
    /**
     * Constructor method for MongoDB translator class.
     * 
     * @param {string} uri
     * @author Christopher Thacker
     * @since 1.0.0
     */
    constructor(uri) {
        this.uri = uri;
    }

    /**
     * Connect method for MongoDB translator class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    connect() {
        console.log("Connecting to MongoDB...");
        mongoose.connect(this.uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log("MongoDB connected!"))
            .catch(error => console.log(`MongoDB connection error: ${error.message}`));
    }

    close() {
        // TODO: method to close the database connection when it's necessary.
    }
    
    create(obj) {
        console.log("Inside MongoDB Translator CREATE");
        // TODO: perform create operation in DB.
    }

    read(obj) {
        console.log("Inside MongoDB Translator READ");
        // TODO: perform get operation in DB.
    }

    update(obj) {
        console.log("Inside MongoDB Translator UPDATE");
        // TODO: perform update operation in DB.
    }

    delete(obj) {
        console.log("Inside MongoDB Translator DELETE");
        // TODO: perform delete operation in DB.
    }
}

module.exports = MongoTranslator;