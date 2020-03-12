'use strict'

const mongoose = require('mongoose');

const ID_DECIMAL_LENGTH = 12;
const ID_HEX_LENGTH = 24;

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
        var isConnected = false;
        await mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
            .then(() => {
                console.log("MongoDB connected!"),
                isConnected = true
            })
            .catch(error => console.log(`MongoDB connection error: ${error.message}`));
        return isConnected;
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
     * @param {*} data 
     * 
     * @author
     * @since 1.0.0
     */
    static async create(modelName, data) {
        const Model = require(`../models/${modelName}`);
        if (this.mongoIsConnected()) {
            const newModel = Model.create(data) 
            return newModel;
        }
        console.log('MongoDB is not connected.');
        return false;
        // TODO: perform create operation in DB. NEEDS TO RETURN OBJECT ID OR FALSE DEPENDING ON SUCCESS STATUS.
    }

    /**
     * Read a single result from DB: used to retrieve data from the MongoDB database
     * using the mongoosejs library functions.
     * 
     * @param {string} modelName
     * @param {ObjectId|string} id 
     * 
     * @returns {Object|null|false} the record if it's found | null if nothing is found | false if invalid ID
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async readOne(modelName, id) {
        // Require the object's corresponding model (TODO: look into a better way of doing this)
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {                
                if (!this.isValidId(id)) {
                    return false;
                }
                const response = await Model.findById(id); // findById() returns 'null' automatically if nothing is found.
                return response;
            } catch (error) {
                console.log('Fatal error when making readOne() request to MongoDB.');
            }
        }
        console.log('MongoDB is not connected.');
        return false;
    }

    /**
     * Read from DB: used to retrieve data from the MongoDB database. Must be generic so that 
     * no matter what gets passed in something will be returned.
     * 
     * @param {string} modelName
     * @param {Object} filter 
     * 
     * @returns {Object|null} the record if it's found | null if nothing is found
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async readMany(modelName, filter) {
        // Require the object's corresponding model (TODO: look into a better way of doing this)
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                const results = await Model.find(filter, (error) => {
                    if (error) {
                        console.log(`Error: ${error.message}`);
                        return false; // Fatal error.
                    }
                }); // find() returns an empty array if nothing is found.
        
                if (!results.length) {
                    return null; // Return null instead of empty array.
                }
        
                return results;
            } catch (error) {
                console.log('Fatal error when making readMany() request to MongoDB.');
            }
        }
        console.log('MongoDB is not connected.');
        return false;
    }

    /**
     * Update in DB.
     * 
     * @param {*} modelName 
     * @param {*} id 
     * 
     * @author
     * @since 1.0.0
     */
    static async update(modelName, id, update) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {                
                if (!this.isValidId(id)) {
                    return false;
                }
                const newModel = await Model.findOneAndUpdate(id, update, {
                    new: true
                  }); //return the document after update was applied
                return newModel;
                
            } catch (error) {
                console.log('Fatal error when making readOne() request to MongoDB.');
            }
        }
        console.log('MongoDB is not connected.');
        return false;
        // TODO: perform update operation in DB. NEEDS TO RETURN TRUE, FALSE, OR NULL DEPENDING ON SUCCESS STATUS.
    }

    /**
     * Delete in DB.
     * 
     * @param {*} modelName 
     * @param {*} id 
     * 
     * @author
     * @since 1.0.0
     */
    static async delete(modelName, id) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {                
                if (!this.isValidId(id)) {
                    return false;
                }
                const response = await Model.findOneAndRemove(id);// remove the entire data for now, witch to boolean later
                return response; //return nothing
            } catch (error) {
                console.log('Fatal error when making readOne() request to MongoDB.');
            }
        }
        console.log('MongoDB is not connected.');
        return false;
        // TODO: perform delete operation in DB. NEEDS TO RETURN TRUE, FALSE, OR NULL DEPENDING ON SUCCESS STATUS.
    }

    /**
     * Helper function to determine if a passed ID is a valid MongoDB ID.
     * It is crucial that this function is called before performing any
     * DB operations involving database object IDs to avoid fatal errors.
     * 
     * @param {String} id
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static isValidId(id) {
        if ((id.length !== ID_DECIMAL_LENGTH && id.length !== ID_HEX_LENGTH)) {
            return false;
        }

        var castedId = new mongoose.Types.ObjectId(id);
        
        if (mongoose.Types.ObjectId.isValid(castedId)) {
            return true;
        }
        return false;
    }

    /**
     * Checks if MongoDB is connected. This can be utilized to check the status of the DB
     * connection before making a request.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static mongoIsConnected() {
        return (mongoose.connection.readyState === 1);
    }
}

module.exports = MongoTranslator;