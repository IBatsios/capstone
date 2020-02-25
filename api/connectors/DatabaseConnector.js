'use strict' // Chrome support for ES6.

// Fetch settings.
const translatorName = require('../config/config').dbTranslator;
const uri = require('../config/config').dbUri;

// Define database translator being used.
const Translator = require('../translators/' + translatorName);

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

    connect() {
        const translator = new Translator(this.uri);
        translator.connect();
    }

    // TODO: Add CRUD operations...
}

module.exports = DatabaseConnector;