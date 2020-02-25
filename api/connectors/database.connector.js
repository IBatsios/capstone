'use strict' // Chrome support for ES6.

const translatorName = 'mongoose.translator';

const Translator = require('../translators/' + translatorName);

/**
 * Database Connector: all calls to the database will be funneled through this file.
 *
 * @author Christopher Thacker
 * @since 1.0.0
 */
class DatabaseConnector {
    constructor(uri, translator) {
        this.uri = uri;
        this.translator = translator;
    }

    connect() {
        const translator = new Translator(this.uri);
        translator.connect();
    }
}

module.exports = DatabaseConnector;