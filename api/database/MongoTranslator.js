'use strict'

const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false); // Fix deprecation warning

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
        var isConnected = false;
        console.log("Connecting to MongoDB...");

        if (uri) {
            try {
                await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
                    .then(() => {
                        console.log("MongoDB connected!");
                        isConnected = true;
                    })
                    .catch(error => console.log(`MongoDB connection error: ${error.message}`));
                // return isConnected;
            } catch (error) {
                console.log(error);
                // return isConnected;
            } finally {
                return isConnected;
            }
        }
        console.log('No MongoDB URI provided.');
        return isConnected;
    }

    /**
     * Closes the MongoDB connection. Not sure if this will be needed but it's here just in case.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async close() {
        var isDisconnected = false;
        console.log("Closing MongoDB connection...");
        try {
            await mongoose.disconnect()
                .then(() => {
                    console.log('MongoDB disconnected.');
                    isDisconnected = true;
                })
                .catch(error => console.log(`Could not disconnect from MongoDB: ${error.message}`));
        } catch (error) {
            console.log(error);
        } finally {
            return isDisconnected;
        }
    }

    /**
     * Create in MongoDB: utilizes mongoosejs to store data in a MongoDB database.
     *  
     * @param {string} modelName 
     * @param {object} data
     * 
     * @returns {object|false} the newly created record if the process was successful | false if the creation process failed
     * 
     * @author Hieu Vo
     * @since 1.0.0
     */
    static async create(modelName, data) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                const newModel = await Model.create(data)
                    .catch((error) => {
                        console.log(`Error: ${error.message}`); // TODO: store error message(s) to be displayed to the user
                        return false;
                    });
                return newModel;
            } catch (error) {
                console.log(`Error: ${error.message}`); // TODO: store error message(s) to be displayed to the user
                return false;
            }
        }
        console.log('MongoDB is not connected.');
        return false;
    }

    /**
     * Read a single result from DB: used to retrieve data from the MongoDB database
     * using the mongoosejs library functions.
     * 
     * @param {string} modelName
     * @param {ObjectId|string} id 
     * 
     * @returns {object|null|false} the record if it's found | null if nothing is found | false if invalid ID
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async readOne(modelName, id) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                if (!this.isValidId(id)) {
                    return false;
                }
                const response = await Model.findById(id) // findById() returns 'null' automatically if nothing is found.
                    .catch((error) => {
                        console.log(`Error: ${error.message}`);
                        return false;
                    });
                return response;
            } catch (error) {
                console.log('Fatal error when making readOne() request to MongoDB.');
                return false;
            }
        }
        console.log('MongoDB is not connected.');
        return false;
    }

    /**
     * Read from DB: used to retrieve data from the MongoDB database.
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
                return false;
            }
        } else {
            console.log('MongoDB is not connected.');
            return false;
        }
    }

    /**
     * Update in DB: change an existing record in the database.
     * 
     * @param {string} modelName 
     * @param {ObjectId|string} id
     * @param {object} data
     * 
     * @returns {object|false} the updated record if operation was successful | false if operation failed
     * 
     * @author Hieu Vo
     * @since 1.0.0
     */
    static async update(modelName, id, data) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                if (!this.isValidId(id)) {
                    return false;
                }
                const newModel = await Model.findByIdAndUpdate(id, { $set: data }, {new: true})
                    .catch((error) => {
                        console.log(`Error: ${error.message}`); // TODO: store error message(s) to be displayed to the user
                        return false;
                    });

                if (newModel === null) {
                    console.log('No object found to update.');
                    return null;
                }

                return newModel;

            } catch (error) {
                console.log('Fatal error when making update() request to MongoDB.');
                return false;
            }
        } else {
            console.log('MongoDB is not connected.');
            return false;
        }
    }

        /**
     * Update in DB: change many existing records in the database.
     * 
     * @param {string} modelName 
     * @param {string} filter
     * @param {object} data
     * 
     * @returns {object|false} the updated record if operation was successful | false if operation failed
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static async updateMany(modelName, filter, data) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                const updatedModels = await Model.updateMany(filter, data)
                    .catch((error) => {
                        console.log(`Error: ${error.message}`); // TODO: store error message(s) to be displayed to the user
                        return false;
                    });

                if (updatedModels === 0) {
                    console.log('No objects found to update.');
                }

                return updatedModels.n;

            } catch (error) {
                console.log('Fatal error when making update() request to MongoDB.');
                return false;
            }
        } else {
            console.log('MongoDB is not connected.');
            return false;
        }
    }

    /**
     * Delete in DB: remove a record from the database.
     * 
     * @param {string} modelName 
     * @param {ObjectId|string} id 
     * 
     * @author Hieu Vo
     * @since 1.0.0
     */
    static async delete(modelName, id) {
        const Model = require(`../models/${modelName}`);

        if (this.mongoIsConnected()) {
            try {
                if (!this.isValidId(id)) {
                    return false;
                }
                const response = await Model.findByIdAndRemove(id) // remove the entire data for now, switch to boolean later
                    .catch((error) => {
                        console.log(`Error: ${error.message}`);
                    });
                return response; //return nothing
            } catch (error) {
                console.log('Fatal error when making delete() request to MongoDB.');
                return false;
            }
        } else {
            console.log('MongoDB is not connected.');
            return false;
        }
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

        try {
            var castedId = new mongoose.Types.ObjectId(id);

            if (mongoose.Types.ObjectId.isValid(castedId)) {
                return true;
            }
            return false;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Checks if MongoDB is connected. This can be utilized to check the status of the DB
     * connection before making a request.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static mongoIsConnected() {
        var isConnected = false;

        try {
            isConnected = (mongoose.connection.readyState === 1);
        } catch (error) {
            console.log(error);
        } finally {
            return isConnected;
        }
    }
}

module.exports = MongoTranslator;
