'use strict' // Chrome support for ES6.

// Fetch settings.
const translatorName = require('../config/config').dbTranslator;
const uri = require('../config/config').dbUri;

// Define database translator being used.
const Translator = require(`../translators/${translatorName}`);

/**
 * Database Connector: all calls to the database will be funneled through this file.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
class DatabaseConnector {
    constructor() {
        this.uri = uri;
        this.translator = new Translator(this.uri);
    }

    /**
     * Connect method for database connector class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    connect() {
        this.translator.connect();
    }

    /**
     * Close connector method: calls the translator's matching "close()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    close() {
        this.translator.close();
    }

    /**
     * Create connector method: calls the translator's matching "create()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    create(req, res) {
        this.translator.create(req, res);
    }

    /**
     * Read connector method: calls the translator's matching "read()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    read(req, res) {
        this.translator.read(req, res);
    }

    /**
     * Update connector method: calls the translator's matching "update()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    update(req, res) {
        this.translator.update(req, res);
    }

    /**
     * Delete connector method: calls the translator's matching "delete()" method.
     * 
     * @param {*} obj
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    delete(req, res) {
        this.translator.delete(req, res);
    }
}

module.exports = DatabaseConnector;