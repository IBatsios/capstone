'use strict' // Chrome support for ES6.

// Fetch settings.
const translatorName = require('../config/config').dbTranslator;
const uri = require('../config/config').dbUri;

// Define database translator being used.
const Translator = require(`../translators/${translatorName}`);
var translator = '';

/**
 * Database Connector: all calls to the database will be funneled through this file.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
class DatabaseConnector {
    constructor() {
        this.uri = uri;
    }

    /**
     * Connect method for database connector class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    connect() {
        translator = new Translator(this.uri);
        translator.connect();
    }

    /**
     * Close connector method: calls the translator's matching "close()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    close() {
        translator.close();
    }

    /**
     * Create connector method: calls the translator's matching "create()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    create(obj) {
        translator.create(obj);
    }

    /**
     * Read connector method: calls the translator's matching "read()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    read(obj) {
        translator.read(obj);
    }

    /**
     * Update connector method: calls the translator's matching "update()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    update(obj) {
        translator.update(obj);
    }

    /**
     * Delete connector method: calls the translator's matching "delete()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    delete(obj) {
        translator.delete(obj);
    }
}

module.exports = DatabaseConnector;