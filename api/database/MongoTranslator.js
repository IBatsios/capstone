'use strict'

const mongoose = require('mongoose');

/**
 * MongoDB Translator: translator class for MongoDB.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class MongoTranslator {
    /**
     * Connect method for MongoDB translator class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async connect(uri) {
        console.log("Connecting to MongoDB...");
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => console.log("MongoDB connected!"))
            .catch(error => console.log(`MongoDB connection error: ${error.message}`));
    }

    /**
     * Closes the MongoDB connection. Not sure if this will be needed but it's here just in case.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async close() {
        console.log("Closing MongoDB connection...");
        mongoose.disconnect();
    }
    
    /**
     * Create in DB.
     *  
     * @param {*} modelName 
     * @param {*} filter 
     * 
     * @author
     * @since 1.0.0
     */
    static async create(modelName, filter) {
        console.log("Inside MongoDB Translator CREATE");
        // TODO: perform create operation in DB.
    }

    /**
     * Read a single result from DB: used to retrieve data from the MongoDB database.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async readOne(modelName, id) {
        // Require the object's corresponding model (TODO: look into a better way of doing this)
        const Model = require(`../models/${modelName}`);

        const results = await Model.findById(id);
        return results;
    }

    /**
     * Read from DB: used to retrieve data from the MongoDB database. Must be generic so that 
     * no matter what gets passed in something will be returned.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async readMany(modelName, filter) {
        // Require the object's corresponding model (TODO: look into a better way of doing this)
        const Model = require(`../models/${modelName}`);

        const results = await Model.find(filter);
        return results;
    }

    /**
     * Update in DB.
     * 
     * @param {*} modelName 
     * @param {*} filter 
     * 
     * @author
     * @since 1.0.0
     */
    static async update(modelName, filter) {
        console.log("Inside MongoDB Translator UPDATE");
        // TODO: perform update operation in DB.
    }

    /**
     * Delete in DB.
     * 
     * @param {*} modelName 
     * @param {*} filter 
     * 
     * @author
     * @since 1.0.0
     */
    static async delete(modelName, filter) {
        console.log("Inside MongoDB Translator DELETE");
        // TODO: perform delete operation in DB.
    }
}

module.exports = MongoTranslator;