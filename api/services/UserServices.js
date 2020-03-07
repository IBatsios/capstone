'use strict'

const DatabaseConnector = require('../database/DatabaseConnector');
const connector = new DatabaseConnector();

const modelName = 'user.model';

/**
 * User Services class: supplement to the traditional models from MVC. Functions here will be used to get specific information from the database.
 * 
 * @author Christopher Thacker
 * @since 1.0.0
 */
class UserServices {

    /**
     * Returns all users based on the provided conditions. If no filters are provided, then all users in the database will be returned.
     * These parameters match the MongoDB function parameters; please refer to the MongoDB documentation for more details on what each
     * parameter is.
     * 
     * @author Christopher Thacker
     * @since 1.0.0
     */
    static getAllUsers(filter, projection, options) {
        const allUsers = connector.readMany(modelName, filter);
        return allUsers;
    }
}

module.exports = UserServices;