'use strict'

// Fetch settings.
const translatorName = require('../config/config').dbTranslator;
const uri = require('../config/config').dbUri;

// Define database translator being used.
const Translator = require(`./${translatorName}`);

/**
 * Database Connector: all calls to the database will be funneled through this file. This is 
 * a singleton class and there can only be one instance of it inside the application.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
class DatabaseConnector {

    /**
     * Constructor method for DatabaseConnector. This is written in a way to ensure that there will
     * only ever be a single instance of DatabaseConnector to avoid multiple connections.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    constructor() {
        if (!!DatabaseConnector.instance) { // "Bang bang, you're a boolean!"
            return DatabaseConnector.instance;
        }
        DatabaseConnector.instance = this;
        return this;
    }

    /**
     * Returns the singleton instance of the Database Connector.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static getInstance() {
        return this;
    }

    /**
     * Connect method for database connector class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async connect() {
        try {
            return await Translator.connect(uri);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Close connector method: calls the translator's matching "close()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async close() {
        try {
            return await Translator.close();
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Create connector method: calls the translator's matching "create()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async create(modelName, data) {
        try {
            return await Translator.create(modelName, data);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Read One connector method: calls the translator's matching "readOne()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async readOne(modelName, id) {
        try {
            return await Translator.readOne(modelName, id);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Read connector method: calls the translator's matching "readMany()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async readMany(modelName, filter) {
        try {
            filter.isActive = true;
            return await Translator.readMany(modelName, filter);     
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Update connector method: calls the translator's matching "update()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async update(modelName, id, data) {
        try {
            return await Translator.update(modelName, id, data);
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /**
     * Delete connector method: calls the translator's matching "delete()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    async delete(modelName, id) {
        try {
            return await Translator.delete(modelName, id);
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DatabaseConnector;
