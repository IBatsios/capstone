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

        // Unload query object
        const query = req.body.query;

        // Unload object ID, if it exists
        const objId = req.params.id;

        // Get model file name that the object belongs to
        const modelName = req.body.model;

        // Require the object's corresponding model
        const Model = require(`../models/${modelName}`);

        // If an object ID is passed, use that to find a record.
        if(objId) {
            Model.findById(objId, function(error, record) {
                if(error) {
                    return next(error);
                } else {
                    console.log(`Sending object with ID ${objId}`);
                    res.send(record);
                }
            });
                
        // Else, return all matching records using the defined query.
        } else {
            Model.find(query, function(error, allModels) {
                if(error) {
                    return next(error);
                } else {
                    console.log(`Sending all models`);
                    res.send(allModels);
                }
            });
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