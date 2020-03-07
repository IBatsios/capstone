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
     * Connect method for database connector class; connects to a MongoDB database
     * that is passed into the translator upon creating its instance.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    connect() {
        return Translator.connect(uri);
    }

    /**
     * Close connector method: calls the translator's matching "close()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    close() {
        return Translator.close();
    }

    /**
     * Create connector method: calls the translator's matching "create()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    create(modelName, filter) {
        return Translator.create(modelName, filter);
    }

    /**
     * Read One connector method: calls the translator's matching "readOne()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    readOne(modelName, id) {
        return Translator.readOne(modelName, id);
    }

    /**
     * Read connector method: calls the translator's matching "readMany()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    readMany(modelName, filter) {
        return Translator.readMany(modelName, filter);
    }

    /**
     * Update connector method: calls the translator's matching "update()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    update(modelName, filter) {
        return Translator.update(modelName, filter);
    }

    /**
     * Delete connector method: calls the translator's matching "delete()" method.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    delete(modelName, filter) {
        return Translator.delete(modelName, filter);
    }
}

module.exports = DatabaseConnector;