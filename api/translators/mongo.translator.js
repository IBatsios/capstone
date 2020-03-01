'use strict' // Chrome support for ES6.

const mongoose = require('mongoose');
const ObjectUtil = require('../util/object.utility');

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

    /**
     * Closes the MongoDB connection. Not sure if this will be needed but it's here just in case.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    close() {
        console.log("Closing MongoDB connection...");
        mongoose.disconnect();
    }
    
    create(req, res) {
        console.log("Inside MongoDB Translator CREATE");
        // TODO: perform create operation in DB.
    }

    /**
     * Read from DB: used to retrieve data from the MongoDB database. Must be generic so that 
     * no matter what gets passed in something will be returned.
     * 
     * @param {*} req 
     * @param {*} res
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    read(req, res) {

        // Unload object
        const obj = req.params.obj;

        // Get model file name that the object belongs to
        const modelName = req.params.model;

        // Require the object's corresponding model
        const Model = require(`../models/${modelName}`);

        if(ObjectUtil.isEmpty(obj)) { // If no specific object is passed, then get all records.
            Model.find(obj, function(error, allModels) {
                if(error) {
                    return next(error);
                } else {
                    console.log("Sending all models!");
                    res.send(allModels);
                }
            });
        } else {
            console.log('Not implemented: find specific objects by ID or topic.');
            // TODO: Find specific object(s) by adding extra if conditions and/or modifying existing one(s).
        }
        
    }

    update(req, res) {
        console.log("Inside MongoDB Translator UPDATE");
        // TODO: perform update operation in DB.
    }

    delete(req, res) {
        console.log("Inside MongoDB Translator DELETE");
        // TODO: perform delete operation in DB.
    }
}

module.exports = MongoTranslator;